const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const encodedToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SEC,
    { expiresIn: 60 * 60 * 24 },
  );
};

const encodedrefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SEC,
    { expiresIn: 60 * 60 * 24 },
  );
};

const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();
};

const decryptPassword = (password) => {
  return CryptoJS.AES.decrypt(password, process.env.PASS_SEC);
};

const newUser = new User({
  username: req.body.username,
  email: req.body.email,
  password: encryptPassword(req.body.password),
});
