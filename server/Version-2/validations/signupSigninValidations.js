import Joi from '@hapi/joi';

const userSignupSchema = Joi.object().keys({
  firstname: Joi.string().min(5).max(15).required(),
  lastname: Joi.string().min(5).max(15).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
  phonenumber: Joi.string().trim().min(10).max(13).required(),
  username: Joi.string().min(5).max(15).required(),
});

const userSigninSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
});

export { userSignupSchema, userSigninSchema };
