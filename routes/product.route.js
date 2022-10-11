const productCtrl = require("../controller/product.controller");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", /*verifyTokenAndAdmin,*/ productCtrl.createProduct)

//UPDATE
router.put("/:id", /*verifyTokenAndAdmin,*/ productCtrl.updateProduct)

//DELETE
router.delete("/:id",/* verifyTokenAndAdmin,*/ productCtrl.deleteProduct)

//GET PRODUCT
router.get("/find/:id", /*verifyTokenAndAdmin,*/ productCtrl.getProduct)

//GET ALL PRODUCTS
router.get("/", /*verifyTokenAndAdmin,*/ productCtrl.getAllProducts)

//GET NUMBER PRODUCTS
router.get("/get-number-product", /*verifyTokenAndAdmin,*/ productCtrl.getNumberProduct)
module.exports = router;