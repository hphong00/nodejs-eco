export {};
import * as Joi from 'joi';
import { User } from '../../api/models';

const requireEmail = () => Joi.string().email().required();

const postPutBody = () => {
  return {
    email: requireEmail(),
    password: Joi.string().min(6).max(128).required(),
    name: Joi.string().max(128),
    role: Joi.string().valid(User.roles),
  };
};
const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};
const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};
const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
module.exports = {
  // GET 1/users
  listUsers: {
    query: {
      limit: Joi.number().min(1).max(9999),
      offset: Joi.number().min(0),
      page: Joi.number().min(0),
      perPage: Joi.number().min(1),
      sort: Joi.string(),
      name: Joi.string(),
      email: Joi.string(),
      role: Joi.string().valid(User.roles),
    },
  },

  // POST /users
  createUser: {
    body: postPutBody(),
  },

  // PUT /users/:userId
  replaceUser: {
    body: postPutBody(),
    params: {
      userId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    },
  },
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
