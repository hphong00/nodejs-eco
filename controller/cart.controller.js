const Cart = require("../models/cart.model");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const ErrorResponse = require("../utils/error_response");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

const cartCtrl = {
  //CREATE
  createCart: async (req, res) => {
    try {
      if (req.body.products == null) {
        return res.status(401).json("Giỏ hàng không có sản phẩm");
      }
      const newCart = new Cart(req.body);
      const user = await User.findById(newCart.userId);
      if (!user) {
        return res.status(401).json("Đăng nhập trước khi thêm vào giỏ hàng");
      }
      if (newCart) {
        var check = true;
        newCart.products.forEach(async function (value) {
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
      // if (check) {
      //   newCart.products.forEach(async function (value) {
      //     if (value.productId) {
      //       var product = await Product.findById(value.productId);
      //       product.numberOfProducts =
      //         product.numberOfProducts - value.quantity;
      //       await product.save();
      //     }
      //   });
      // } else {
      //   return res.status(404).json("Đã có lỗi mời bạn mua lại");
      // }
      await newCart.save();
      return res.status(200).json("Thêm vào giỏ hàng thành công");
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //UPDATE
  updateCart: async (req, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE
  deleteCart: async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Cart has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET USER CART
  getUserCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // //GET ALL
  getAllCart: async (req, res) => {
    try {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = cartCtrl;
