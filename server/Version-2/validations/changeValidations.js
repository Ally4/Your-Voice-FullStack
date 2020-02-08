/* eslint-disable linebreak-style */
import Joi from '@hapi/joi';

const changeStatusSchema = Joi.object().keys({
  status: Joi.string().min(5).max(500).required(),
});

export default changeStatusSchema;
