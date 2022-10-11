const mongoose = require("mongoose");
const Joi = require('joi');

// const roles = [
//   "ROLE_ADMIN",
//   "ROLE_JE",
//   "ROLE_ANONYMOUS",
//   "ROLE_USER",
//   "ROLE_SUPER_ADMIN",
//   "ROLE_MANAGER",
// ];

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // required: true,
      // unique: true,
      // maxlength: 30,
      // minlength: 5,
      // match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/,
    },
    email: {
      type: String,
      // match: /^\S+@\S+\.\S+$/,
      // required: true,
      // unique: true,
      // trim: true,
      // lowercase: true,
      // index: { unique: true },
      // maxlength: 30,
      // minlength: 5,
    },
    password: {
      type: String,
      // required: true,
      // maxlength: 30,
      // minlength: 5,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: Array,
      // enum: roles,
      default: "ROLE_USER",
    },
    active: {
      type: Boolean,
      default: true,
    },
    services: {
      facebook: String,
      google: String,
    },
    profile: {
      fullName: {
        type: String,
        default: "",
        // maxlength: 128,
        // index: true,
        // trim: true,
      },
      address: {
        type: String,
        default: "",
      },
      phone: {
        type: String,
        default: "",
      },
      sex: {
        type: String,
        default: "",
      },
      avata: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);
// function validateUser(user) {
//   const schema = {
//     username: Joi.string().min(3).max(50).required(),
//     // email: Joi.string().min(5).max(255).required().email(),
//     password: Joi.string().min(3).max(255).required()
//   };

//   return Joi.validate(user, schema);
// }

module.exports = mongoose.model("User", UserSchema);
// exports.validate = validateUser;
