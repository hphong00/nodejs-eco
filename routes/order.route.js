const orderCtrl = require('../controller/order.controller');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middleware/verifyToken');

const router = require('express').Router();

//CREATE
router.post('/', /* verifyToken,*/ orderCtrl.createOrder);

//UPDATE
router.put('/:id', /* verifyTokenAndAdmin,*/ orderCtrl.updeteOrder);

//DELETE
router.delete('/:id', /* verifyTokenAndAdmin,*/ orderCtrl.deleteOrder);

//GET USER ORDERS
router.get(
  '/find/:userId',
  /* verifyTokenAndAuthorization,*/ orderCtrl.getUserOrders,
);

// //GET ALL
router.get('/', /*verifyTokenAndAdmin,*/ orderCtrl.getAllOrder);

// GET MONTHLY INCOME
router.get('/income', /* verifyTokenAndAdmin,*/ orderCtrl.getMonthlyIncome);

module.exports = router;
