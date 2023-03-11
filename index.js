const dotenv = require("dotenv");
const express = require("express");
const app = express();
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const productRoute = require("./routes/product.route");
const cartRoute = require("./routes/cart.route");
const orderRoute = require("./routes/order.route");
const stripeRoute = require("./routes/stripe.route");
const passwordReset = require("./routes/password-reset.route");
const passport = require("passport");
const {
  jwtStrategy,
  jwtGoogleStrategy,
  jwtFacebookStrategy,
} = require("./middleware/passport");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

const setUpData = require("./utils/setup_data");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db.config");
// const logger = require('./config/logger');
// const readDbCsv = require('./utils/export_collection_csv');
// const readDbJs = require('./utils/export-file-js');

//cn database
dotenv.config();
connectDB();

app.use(function (req, res, next) {
  //website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5000");
  // Request ethos you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "x-access-token,content-type");
  // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to the next layer of middleware
  next();
});

// parse json request body
app.use(express.json());

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);
passport.use("google-plus-token", jwtGoogleStrategy);
passport.use("facebook-token", jwtFacebookStrategy);

// log
app.use(morgan("combined"));

// api routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/password-reset", passwordReset);

// handle error
app.use(errorHandler);

// setup data
setUpData();

app.listen(process.env.PORT || 4000, () => {
  console.log("start running the server ");
});
