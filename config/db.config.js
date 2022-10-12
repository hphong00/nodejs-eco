const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    // Connecting to the database
    await mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: true,
      })
      .then(() => {
        console.log('Successfully connected to database');
      });
  } catch (error) {
    console.log('database connection failed. exiting now...');
    console.error(error);
    process.exit(1);
  }
};
module.exports = connectDB;
