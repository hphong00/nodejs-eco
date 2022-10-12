// const Joi = require("joi");
const Joi = require('@hapi/joi');

const validateBody = (schema) => {
  return (req, res, next) => {
    const validatorResult = schema.validate(req.body);

    if (validatorResult.error) {
      return res.status(400).json(validatorResult.error);
    } else {
      if (!req.value) req.value = {};
      if (!req.value['params']) req.value.params = {};

      req.value.body = validatorResult.value;
      next();
    }
  };
};

const validateParam = (schema, name) => {
  return (req, res, next) => {
    const validatorResult = schema.validate({ param: req.params[name] });

    if (validatorResult.error) {
      return res.status(400).json(validatorResult.error);
    } else {
      if (!req.value) req.value = {};
      if (!req.value['params']) req.value.params = {};

      req.value.params[name] = req.params[name];
      next();
    }
  };
};

const schemas = {
  authSignInSchema: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().min(1).required().max(50),
  }),

  authSignUpSchema: Joi.object().keys({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),

  deckSchema: Joi.object().keys({
    name: Joi.string().min(6).required(),
    description: Joi.string().min(10).required(),
  }),

  deckOptionalSchema: Joi.object().keys({
    name: Joi.string().min(6),
    description: Joi.string().min(10),
    owner: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  }),

  idSchema: Joi.object().keys({
    param: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  }),

  newDeckSchema: Joi.object().keys({
    name: Joi.string().min(6).required(),
    description: Joi.string().min(10).required(),
    owner: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  }),

  userSchema: Joi.object().keys({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
  }),

  userOptionalSchema: Joi.object().keys({
    firstName: Joi.string().min(2),
    lastName: Joi.string().min(2),
    email: Joi.string().email(),
  }),
};

module.exports = {
  validateBody,
  validateParam,
  schemas,
};

// module.exports = {
//   // POST /auth/register
//   register: {
//     body: {
//       username: Joi.string().required().min(6).max(128),
//       email: Joi.string().email().required(),
//       password: Joi.string().required().min(6).max(128),
//     },
//   },

//   // POST /auth/login
//   login: {
//     body: {
//       email: Joi.string().email().required(),
//       password: Joi.string().required().max(128),
//     },
//   },

//   // POST /auth/facebook
//   // POST /auth/google
//   oAuth: {
//     body: {
//       accessToken: Joi.string().required(),
//     },
//   },

//   // POST /auth/refresh
//   refresh: {
//     body: {
//       id: Joi.string().required(),
//       refreshToken: Joi.string().required(),
//     },
//   },

//   // POST /auth/forgot-password
//   forgotPassword: {
//     body: {
//       email: Joi.string().email().required(),
//     },
//   },
// };
