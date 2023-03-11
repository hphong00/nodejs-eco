const mongoose = require("mongoose");
const ShopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    address: {
      type: Object,
    },
    numberOfProducts: {
      type: Number,
    },
    follow: {
      type: Number,
    },
    following: {
      type: Number,
    },
    evaluate: {
      type: Number,
    },
    voucher: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shop", ShopSchema);
