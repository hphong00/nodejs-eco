const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    products: [
      {
        productId: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          default: 1,
          required: true
        },
      },
    ],
    amount: { type: Number },
    address: { type: Object },
    status: { type: String, default: "Chờ xác nhận" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
