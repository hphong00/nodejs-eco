const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        shopId: {
          type: String,
          // required: true,
        },
        productId: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          required: true,
        },
        voucherShop: {
          type: String,
        },
        note: {
          type: String,
        },
      },
    ],
    paymentMethods: {
      // phương thức thanh toán
      type: Object,
      // required: true,
    },
    shippingMethod: {
      // phương thức vận chuyển
      type: Object,
      // required: true,
    },
    voucherApp: {
      type: String,
    },
    voucherPayment: {
      type: String,
    },
    refund: {
      // số tiền hoàn
      type: String,
    },
    accumulatedMoney: {
      type: Number,
    },
    paymentStatus: { type: String },
    address: { type: Object },
    status: { type: String, default: "Chờ xác nhận" },
    infoShipping: { type: Object }, // thông tin vận chuyển
    totalProducts: { type: Number },
    amount: { type: Number }, // tổng tiền
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
