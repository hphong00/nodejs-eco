const User = require("../models/user.model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const APIResponse = require("../utils/response");
const {
  PORT,
  MONGO_URL,
  PASS_SEC,
  JWT_SEC,
  STRIPE_KEY,
  HOST,
  USER,
  PASS,
  SERVICE,
  BASE_URL,
  JWT_EXPIRATION_MINUTES,
  UPLOAD_LIMIT,
} = require("../config/vars");

const encodedToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SEC,
    { expiresIn: 60 * 60 * 24 }
  );
};

const encodedRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SEC,
    { expiresIn: 60 * 60 * 24 }
  );
};

const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();
};

const decryptPassword = (password) => {
  return CryptoJS.AES.decrypt(password, process.env.PASS_SEC);
};

const auth = {
  //REGISTER
  register: async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //LOGIN
  login: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(401).json("not found username");
      }

      const hashedPassword = decryptPassword(user.password);
      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      if (OriginalPassword !== req.body.password) {
        return res.status(401).json(OriginalPassword);
      }

      const accessToken = encodedToken(user);
      const refreshToken = encodedRefreshToken(user);

      const cookie = res.cookie("jwt", refreshToken, {
        httpOnly: true, //accessible only by web server
        sameSite: "None", //cross-site cookie
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });

      const response = {
        code: 200,
        status: "successful",
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //refresh Token
  refreshToken: async (req, res) => {
    const { refreshToken } = req.body;
    if (refreshToken) {
      try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SEC);
        const user = await User.findById(decoded.id);
        if (!user) {
          return res.status(400).send("Invalid refreshToken");
        }
        const accessToken = encodedToken(user);
        const response = {
          code: 200,
          status: "refresh successful",
          accessToken: accessToken,
        };
        return res.status(200).send(response);
      } catch (err) {
        return res.status(401).send("Invalid refreshToken");
      }
    } else {
      res.status(404).send("Invalid refreshToken");
    }
  },

  // login with google
  google: async (req, res) => {
    try {
      if (req.user) {
        const user = await User.findOne({ email: req.user.email });
        if (user) {
          const accessToken = encodedToken(user);
          const refreshToken = encodedRefreshToken(user);

          const cookie = res.cookie("jwt", refreshToken, {
            httpOnly: true, //accessible only by web server
            sameSite: "None", //cross-site cookie
            maxAge: 3 * 24 * 60 * 60 * 1000,
          });

          const response = {
            code: 200,
            status: "successful",
            accessToken: accessToken,
            refreshToken: refreshToken,
          };
          res.status(200).json(response);
        } else {
          res.status(401).json("false");
        }
      }
    } catch (err) {
      next(err);
    }
  },

  // LOGOUT
  logout: async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.json({ message: "Cookie cleared" });
  },
};

module.exports = auth;
