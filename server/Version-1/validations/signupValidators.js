import Joi from '@hapi/joi';

const userSignupSchema = Joi.object().keys({
    firstName: Joi.string().min(5).max(15).required(),
    lastName: Joi.string().min(5).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
    phoneNumber: Joi.string().trim().min(10).max(13).required(),
    userName   : Joi.string().min(5).max(15).required(),
});

export default userSignupSchema;