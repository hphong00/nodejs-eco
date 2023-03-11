const Order = require("../models/order.model");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

const orderCtrl = {
  //create
  createOrder: async (req, res) => {
    try {
      if (req.body.products == null) {
        return res.status(401).json("Đơn hàng không có sản phẩm");
      }
      const newOrder = new Order(req.body);
      const user = await User.findById(newOrder.userId);
      if (!user) {
        return res.status(401).json("Đăng nhập trước khi đặt hàng");
      }
      if (newOrder) {
        var check = true;
        newOrder.products.forEach(async function (value) {
          if (value.productId) {
            var product = await Product.findById(value.productId);
            if (
              product.numberOfProducts < value.quantity ||
              product.numberOfProducts < 1
            ) {
              check = false;
              return res
                .status(404)
                .json("Số lượng " + product.title + " không đủ");
            }
          } else {
            return res.status(404).json("Sản phẩm đã ngừng kinh doanh");
          }
        });
      }
      if (check) {
        newOrder.products.forEach(async function (value) {
          if (value.productId) {
            var product = await Product.findById(value.productId);
            product.numberOfProducts =
              product.numberOfProducts - value.quantity;
            await product.save();
          }
        });
      } else {
        return res.status(404).json("Đã có lỗi mời bạn đặt hàng lại");
      }
      const newOrd = await newOrder.save();
      return res.status(200).json(newOrd);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //Update
  updateOrder: async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Delete
  deleteOrder: async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Get user orders
  getUserOrders: async (req, res) => {
    try {
      const orders = await Order.find({ userId: req.params.userId });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Get all
  getAllOrder: async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Get số lượng sản phẩm của tháng đó
  getMonthlyIncome: async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );

    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = orderCtrl;
