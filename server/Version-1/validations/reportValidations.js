import Joi from '@hapi/joi';

const reportSchema = Joi.object().keys({
    createdBy: Joi.string().min(5).max(30).required(),
    title: Joi.string().min(5).max(15).required(),
    type: Joi.string().min(5).max(15).required(),
    latCoordonate: Joi.string().min(5).max(20).required(),
    longCoordonate: Joi.string().min(5).max(20).required(),
    comment : Joi.string().min(5).max(500).required(),
});

const updateReportCommentSchema = Joi.object().keys({
    comment : Joi.string().min(5).max(500).required(),
});

const updateReportLocationSchema = Joi.object().keys({
    latCoordonate: Joi.string().min(5).max(20).required(),
    longCoordonate: Joi.string().min(5).max(20).required(),
});

export {reportSchema, updateReportCommentSchema, updateReportLocationSchema} ;