module.exports = {
  PORT: process.env.PORT,

  MONGO_URL: process.env.MONGO_URL,

  PASS_SEC: process.env.PASS_SEC,
  JWT_SEC: process.env.JWT_SEC,
  STRIPE_KEY: process.env.STRIPE_KEY,

  HOST: process.env.HOST,
  USER: process.env.USER,
  PASS: process.env.PASS,
  SERVICE: process.env.SERVICE,
  BASE_URL: process.env.BASE_URL,

  JWT_EXPIRATION_MINUTES: process.env.JWT_EXPIRATION_MINUTES,
  UPLOAD_LIMIT: 5, // MB
};
