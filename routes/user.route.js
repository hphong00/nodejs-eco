const userCrtl = require("../controller/user.controller");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenJe,
  verifyTokenAnonymous,
  verifyTokeSuperAdmin,
} = require("../middleware/verifyToken");
const passport = require("passport");
const passportConfig = require("../middleware/passport");

const router = require("express").Router();

//UPDATE
router.put("/:id", /* verifyTokenAndAuthorization,*/ userCrtl.updateUser);

//UPDATE PROFILE
router.put(
  "/profile/:id",
  /* verifyTokenAndAuthorization,*/ userCrtl.updateProfile
);

//DELETE
router.delete("/:id", /* verifyTokenAndAuthorization,*/ userCrtl.deleteUser);

//GET USER
router.get("/find/:id", /* verifyTokenAndAdmin,*/ userCrtl.getUser);

//GET ALL USER
router.get("/", userCrtl.getAllUsers);

// router
//   .route("/")
//   .get(passport.authenticate("jwt", { session: false }), userCrtl.getAllUsers);

//GET USER STATS
router.get("/stats", /* verifyTokenAndAdmin,*/ userCrtl.getUserStats);

//SEND EMAIL RESET PASSWORD
router.post("/password-reset", /* verifyToken,*/ userCrtl.resetPassword);

//FORGOT PASSWORD
router.post("/:userId/:token", /* verifyToken,*/ userCrtl.changePasswordfg);

// CHANGE PASSWORD
router.post("/change-password", /* verifyToken,*/ userCrtl.changePassword);

module.exports = router;
