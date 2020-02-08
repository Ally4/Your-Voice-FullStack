import Joi from '@hapi/joi';

const reportSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  createdby: Joi.string().min(5).max(30).required(),
  title: Joi.string().min(5).max(15).required(),
  type: Joi.string().min(5).max(15).required(),
  latcoordonate: Joi.string().min(5).max(20).required(),
  longcoordonate: Joi.string().min(5).max(20).required(),
  comment: Joi.string().min(5).max(500).required(),
});

const updateReportCommentSchema = Joi.object().keys({
  comment: Joi.string().min(5).max(500).required(),
});

const updateReportLocationSchema = Joi.object().keys({
  latcoordonate: Joi.string().min(5).max(20).required(),
  longcoordonate: Joi.string().min(5).max(20).required(),
});

export { reportSchema, updateReportCommentSchema, updateReportLocationSchema };
