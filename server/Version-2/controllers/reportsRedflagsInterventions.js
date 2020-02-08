import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import queries from '../database/queries';
import pool from '../database/configuration';

import { reportSchema, updateReportCommentSchema, updateReportLocationSchema } from '../validations/reportValidations';

dotenv.config();

class RedflagsAndInterventions {
  static async createRedflagsInterventions(req, res) {
    const { error } = reportSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    const {
      email, createdby, title, type, latcoordonate, longcoordonate, comment,
    } = req.body;

    const images = req.files.images[0].path;
    const videos = req.files.videos[0].path;
    const report = await pool.query(queries[0].insertReport, [email, createdby, title, type, latcoordonate, longcoordonate, images, videos, comment]);
    return res.status(201).json({
      status: 201,
      message: 'Report created successfully',
      data: {
        email,
        createdby,
        title,
        type,
        latcoordonate,
        longcoordonate,
        images,
        videos,
        comment,
      },
    });
  }

  static async redflagIntervention(req, res) {
    const flag = await pool.query(queries[0].reportSelect, [req.params.reportId]);
    if (flag.rows === 'undefined' || flag.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'The report is not in the system',
      });
    }
    return res.status(200).json({
      status: 200,
      report: flag.rows[0],
    });
  }

  static async allRedflagsInterventions(req, res) {
    const flags = await pool.query(queries[0].getAllReports);
    if (flags.rows === 'undefined' || flags.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'The reports are not in the system',
      });
    }
    return res.status(200).json({
      status: 200,
      data: flags.rows[0],
    });
  }

  static async updateReportComment(req, res) {
    const head = req.headers.authorization;
    const us = jwt.verify(head, process.env.KEY);
    const com = await pool.query(queries[0].reportSelect, [req.params.id]);
    const { error } = updateReportCommentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    if (!com.rows[0]) {
      return res.status(404).json({
        status: 404,
        message: 'The report is not in the system',
      });
    }
    if (com.rows[0].status !== 'Draft') {
      return res.status(400).json({
        status: 400,
        message: 'You cannot change the location as the status is no more draft',
      });
    }
    if (us.email !== com.rows[0].email) {
      return res.status(403).json({
        status: 403,
        message: 'You are not allow to change this comment as it`s not your report',
      });
    }
    const updating = req.body.comment;
    await pool.query(`UPDATE reports SET comment = '${updating}' WHERE reportid=${req.params.id}`);
    return res.status(200).json({
      status: 200,
      data: {
        message: 'The comment have been updated successfully',
      },
    });
  }

  static async updateReportLocation(req, res) {
    const head = req.headers.authorization;
    const us = jwt.verify(head, process.env.KEY);
    const loc = await pool.query(queries[0].reportSelect, [req.params.id]);
    const { error } = updateReportLocationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    if (!loc.rows[0]) {
      return res.status(404).json({
        status: 404,
        message: 'The report is not in the system',
      });
    }
    if (loc.rows[0].status !== 'Draft') {
      return res.status(400).json({
        status: 400,
        message: 'You cannot change the location as the status is no more draft',
      });
    }
    if (us.email !== loc.rows[0].email) {
      return res.status(403).json({
        status: 403,
        message: 'You are not allow to change this comment as it`s not your report',
      });
    }
    if (us.email === loc.rows[0].email) {
      const updateLat = req.body.latcoordonate;
      const updateLong = req.body.longcoordonate;
      await pool.query(`UPDATE reports SET latcoordonate = '${updateLat}' WHERE reportid=${req.params.id} `);
      await pool.query(`UPDATE reports SET longcoordonate = '${updateLong}' WHERE reportid=${req.params.id} `);
      return res.status(200).json({
        status: 200,
        data: {
          message: 'The location have been updated successfully',
        },
      });
    }
  }

  static async deleteRedflagIntervention(req, res) {
    const head = req.headers.authorization;
    const us = jwt.verify(head, process.env.KEY);
    const del = await pool.query(queries[0].reportSelect, [req.params.id]);
    if (!del.rows[0]) {
      return res.status(404).json({
        status: 404,
        message: 'The report is not in the system',
      });
    }
    if (del.rows[0].email !== us.email) {
      res.status(403).json({
        status: 403,
        message: 'You are not allow to delete this report as it`s not yours report',
      });
    }
    await pool.query(queries[0].delete, [req.params.id]);
    res.status(200).json({
      status: 200,
      message: 'The report have been deleted successfully',
    });
  }
}


export default RedflagsAndInterventions;
