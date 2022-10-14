const auth = require('../middleware/auth');
const router = require('express').Router();
const passport = require('passport');
const validate = require('express-validation');
const {
  login,
  register,
  oAuth,
  refresh,
  forgotPassword,
} = require('../validations/auth.validation');

const {
  schemas,
  validateParam,
  validateBody,
} = require('../validations/auth.validation');

router.post(
  '/register',
  /* validateParam(schemas.idSchema, 'userID'),*/ auth.register,
);

router
  .route('/login')
  .post(/*validateBody(schemas.authSignUpSchema),*/ auth.login);

router.post('/token', /* verifyToken,*/ auth.refreshToken);

router.route('/google').post(passport.authenticate('google-plus-token', { session: false }),  auth.google);

router.route('/facebook').post(passport.authenticate('facebook-token', { session: false }),  auth.login);

module.exports = router;
