const router = require('express').Router();
const Key =
  'sk_test_51LCNWkBP1LwCA3stWLj44k61GXcX5eCfzE22CksgTOdZ8GJTJnbHdbiRupE4TMrUsk1nF9oG7M5xfx6OqhvSIgPv00EPvXfx8B';
const stripe = require('stripe')(Key);
// const KEY = process.env.STRIPE_KEY
// const stripe = require("stripe")("pk_test_51Kz1UzAxCpOAdfMsbxmgJ1sZ9gE4PLSJoJ5OgK3jsGwkaWUFGRIK3e9rx9J1OhBHRf5F3dPeMvlWNF4rV73igBUS00oO13xjFY");
router.post('/payment', (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: 'usd',
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    },
  );
});
module.exports = router;
