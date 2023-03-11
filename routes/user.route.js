const userCtrl = require('../controller/user.controller');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenJe,
  verifyTokenAnonymous,
  verifyTokeSuperAdmin,
} = require('../middleware/verifyToken');
const passport = require('passport');
const router = require('express').Router();

//UPDATE
router.put('/:id', /* verifyTokenAndAuthorization,*/ userCtrl.updateUser);

//UPDATE PROFILE
router.put(
  '/profile/:id',
  /* verifyTokenAndAuthorization,*/ userCtrl.updateProfile,
);

//DELETE
router.delete('/:id', /* verifyTokenAndAuthorization,*/ userCtrl.deleteUser);

//GET USER
router.get('/find/:id', /* verifyTokenAndAdmin,*/ userCtrl.getUser);

//GET ALL USER
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  userCtrl.getAllUsers,
);

// router
//   .route("/")
//   .get(passport.authenticate("jwt", { session: false }), userCtrl.getAllUsers);

//GET USER STATS
router.get('/stats', /* verifyTokenAndAdmin,*/ userCtrl.getUserStats);

//SEND EMAIL RESET PASSWORD
router.post('/password-reset', /* verifyToken,*/ userCtrl.resetPassword);

//FORGOT PASSWORD
router.post('/:userId/:token', /* verifyToken,*/ userCtrl.forgotPassword);

// CHANGE PASSWORD
router.post('/change-password', /* verifyToken,*/ userCtrl.changePassword);

module.exports = router;
