const User = require('../models/user.model');
const sendEmail = require('../utils/sendEmail');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middleware/verifyToken');
const pick = require('../utils/pick');

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

const userCrtl = {
  //UPDATE
  updateUser: async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC,
      ).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true },
      );
      return res.status(200).json(updatedUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // UPDATE PROFILE
  updateProfile: async (req, res) => {
    try {
      const updateprofile = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: { profile: req.body },
        },
        { new: true },
      );
      res.status(200).json(updateprofile);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('xóa thành công');
    } catch (err) {
      res.st;
      atus(500).json(err);
    }
  },

  //GET USER
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET ALL USER
  getAllUsers: async (req, res) => {
    try {
      const paginates = req.body;
      if (paginates.email && paginates.username) {
        var filter = {
          username: paginates.username,
          email: paginates.email,
        };
      } else if (paginates.username) {
        var filter = {
          username: paginates.username,
        };
      } else if (paginates.email) {
        var filter = {
          email: paginates.email,
        };
      } else {
        var filter = {};
      }
      const options = {
        sortBy: paginates.sortBy,
        limit: paginates.limit,
        page: paginates.page,
      };
      const result = await queryUsers(filter, options);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET USER STATS
  getUserStats: async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: '$createdAt' },
          },
        },
        {
          $group: {
            _id: '$month',
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // change password
  changePassword: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(401).json('Wrong credentials!');
      }
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC,
      );

      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      if (OriginalPassword !== req.body.password) {
        return res.status(401).json('Wrong credentials!');
      }
      (changePassword = CryptoJS.AES.encrypt(
        req.body.newPassword,
        process.env.PASS_SEC,
      )),
        (user.password = changePassword);
      await user.save();
      res.status(200).json('Ok');
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // send email reset password
  resetPassword: async (req, res) => {
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
        { expiresIn: 60 * 60 * 24 },
      );
      const url = `${process.env.BASE_URL}/password-reset/${user._id}/${accessToken}`;
      const link =
        'Link reset password' +
        '<a href="' +
        url +
        '">Click vào đây để đổi lại mật khẩu</a>';

      await sendEmail(user.email, 'Password reset', link);

      res.send('password reset link sent to your email account');
    } catch (error) {
      res.send('An error occured');
      console.log(error);
    }
  },

  // change password(forgot password)
  changePasswordfg: async (req, res) => {
    try {
      const schema = Joi.object({ password: Joi.string().required() });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const user = await User.findById(req.params.userId);
      if (!user) return res.status(400).send('invalid link or expired');
      try {
        const decoded = jwt.verify(req.params.token, process.env.JWT_SEC);
        if (req.params.userId != decoded.id) {
          return res.status(401).send('Invalid Token');
        }
      } catch (err) {
        return res.status(401).send('Invalid Token');
      }
      (changePassword = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC,
      )),
        (user.password = changePassword);
      await user.save();
      res.send('password reset sucessfully.');
    } catch (error) {
      res.send('An error occured');
      console.log(error);
    }
  },
};
module.exports = userCrtl;
