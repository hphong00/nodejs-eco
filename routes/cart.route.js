const cartCtrl = require('../controller/cart.controller');
//phân quyền
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middleware/verifyToken');

const router = require('express').Router();

//CREATE
router.post('/', /* verifyToken,*/ cartCtrl.createCart);

//UPDATE
router.put('/:id', /*verifyTokenAndAuthorization,*/ cartCtrl.updateCart);

//DELETE
router.delete('/:id', /*verifyTokenAndAuthorization,*/ cartCtrl.deleteCart);

//GET USER CART
router.get(
  '/find/:userId',
  /*verifyTokenAndAuthorization,*/ cartCtrl.getUserCart,
);

// //GET ALL
router.get('/', /*verifyTokenAndAdmin,*/ cartCtrl.getAllCart);

module.exports = router;
