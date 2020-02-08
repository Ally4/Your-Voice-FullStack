/* eslint-disable linebreak-style */
/* eslint-disable radix */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import moment from 'moment';
import recordTables from '../models/DB';
import { reportSchema, updateReportCommentSchema, updateReportLocationSchema } from '../validations/reportValidations';

dotenv.config();

class RedflagsAndInterventions {
  static createRedflagsInterventions(req, res) {
    const { error } = reportSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message.replace(/"/g, ''),
      });
    }


    const image = req.files.theImage[0].path;
    const video = req.files.theVideo[0].path;

    const {
      createdBy, title, type, latCoordonate, longCoordonate, comment,
    } = req.body;

    const reportId = recordTables.length + 1;
    const report = {
      reportId,
      createdOn: moment().format('LLLL'),
      createdBy,
      title,
      type,
      latCoordonate,
      longCoordonate,
      status: 'Draft',
      images: image,
      videos: video,
      comment,
    };
    recordTables.push(report);
    return res.status(201).json({
      status: 201,
      message: 'Report created successfully',
      data: {
        report,
      },
    });
  }

  static updateReportLocation(req, res) {
    const report = recordTables.find((i) => i.reportId === parseInt(req.params.id));
    const { error } = updateReportLocationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    const head = req.headers.authorization;
    const us = jwt.verify(head, process.env.KEY);
    if (report.email !== us.email) {
      res.status(403).json({
        status: 403,
        message: 'You are not allow to change this location as it`s not your report',
      });
    }
    if (!report) {
      return res.status(404).json({
        status: 404,
        message: 'report not found',
      });
    }
    if (report.status === 'Draft') {
      return res.status(400).json({
        status: 400,
        message: 'You cannot change the location as the status is no more draft',
      });
    }
    report.latCoordonate = req.body.latCoordonate;
    report.longCoordonate = req.body.longCoordonate;
    return res.status(200).json({
      status: 200,
      message: 'Report location updated successfully ',
    });
  }


  static allRedflagsInterventions(req, res) {
    if (recordTables.length < 1) {
      return res.status(404).json({
        status: 404,
        message: 'The reports are not in the system',
      });
    }
    return res.status(200).json({
      status: 200,
      data: recordTables,
    });
  }

  static redflagIntervention(req, res) {
    const report = recordTables.find((r) => r.reportId === parseInt(req.params.reportId));
    if (!report) {
      return res.status(404).json({
        status: 404,
        message: 'The report is not in the system',
      });
    }
    return res.status(200).json({
      status: 200,
      report,
    });
  }

  static updateReportComment(req, res) {
    const report = recordTables.find((r) => r.reportId === parseInt(req.params.id));
    const { error } = updateReportCommentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    if (report.status !== 'Draft') {
      return res.status(400).json({
        status: 400,
        error: 'You cannot change the location as the status is no more draft',
      });
    }
    if (!report) {
      return res.status(404).json({
        status: 404,
        message: 'The report is not in the system',
      });
    }
    const head = req.headers.authorization;
    const us = jwt.verify(head, process.env.KEY);
    if (report.email !== us.email) {
      res.status(403).json({
        status: 403,
        message: 'You are not allow to change this comment as it`s not your report',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'The comment have been updated successfully',

    });
  }

  static deleteRedflagIntervention(req, res) {
    const report = recordTables.find((u) => u.reportId === parseInt(req.params.id));
    const head = req.headers.authorization;
    const us = jwt.verify(head, process.env.KEY);
    if (report.email !== us.email) {
      res.status(403).json({
        status: 403,
        message: 'You are not allow to delete this report as it`s not yours report',
      });
    }
    if (!report) {
      return res.status(404).json({
        status: 404,
        message: 'The report is not in the system',
      });
    }
    recordTables.splice(recordTables.indexOf(report), 1);
    return res.status(200).json({
      status: 200,
      message: 'The report have been deleted successfully',
    });
  }
}


export default RedflagsAndInterventions;
