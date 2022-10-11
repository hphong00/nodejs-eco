const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const Joi = require("joi");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

router.post("/", async (req, res) => {
  try {
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("user with given email doesn't exist");
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: 60 * 60 * 24 }
    );
    const url = `${process.env.BASE_URL}/password-reset/${user._id}/${accessToken}`;
    const html = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${url} clicktracking=off>${"Click at here"}</a>
    `;
    await sendEmail(user.email, "Password reset", html);

    res.send("password reset link sent to your email account");
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
});

router.post("/:userId/:token", async (req, res) => {
  try {
    const schema = Joi.object({ password: Joi.string().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("invalid link or expired");
    try {
      const decoded = jwt.verify(req.params.token, process.env.JWT_SEC);
      if (req.params.userId != decoded.id) {
        return res.status(401).send("Invalid Token");
      }
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    (changePassword = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    )),
      (user.password = changePassword);
    await user.save();
    res.send("password reset sucessfully.");
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
});

module.exports = router;
