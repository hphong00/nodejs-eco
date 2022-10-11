const auth = require("../middleware/auth");
const router = require("express").Router();
const validate = require("express-validation");
const {
  login,
  register,
  oAuth,
  refresh,
  forgotPassword,
} = require("../validations/auth.validation");
const passport = require("passport");
const passportConfig = require("../middleware/passport");

const {
  schemas,
  validateParam,
  validateBody,
} = require("../validations/auth.validation");

router.post(
  "/register",
  /* validateParam(schemas.idSchema, 'userID'),*/ auth.register
);

router
  .route("/login")
  .post(/*validateBody(schemas.authSignUpSchema),*/ auth.login);

router.post("/token", /* verifyToken,*/ auth.refreshToken);

router.post("/google", /* verifyToken,*/ auth.google);
// router.route("/logout").post(/* authorize(LOGGED_USER),*/ controller.logout);
// router
//   .route("/facebook")
//   .post(/* validate(oAuth),*/ oAuthLogin("facebook"), controller.oAuth);

module.exports = router;
