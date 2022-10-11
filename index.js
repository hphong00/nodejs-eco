const dotenv = require('dotenv')
const express = require('express')
const app = express()
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const productRoute = require('./routes/product.route');
const cartRoute = require("./routes/cart.route");
const orderRoute = require("./routes/order.route");
const stripeRoute = require("./routes/stripe.route");
const passwordReset = require("./routes/password-reset.route");
const setUpData =   require('./utils/setup_data');

const cors = require('cors');
const errorHandler = require("./middleware/error");
const connectDB = require('./config/db.config');
// const readDbScvv = require('./utils/export_collection_csv');
// const readDbJs = require('./utils/export-file-js');
dotenv.config()
connectDB()

app.use(cors())
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/password-reset", passwordReset);

app.use(errorHandler);
setUpData();

app.listen(process.env.PORT || 5000, ()=> {
    console.log("start running the server ")
})


