import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../database/configuration';
import queries from '../database/queries';
import changeStatusSchema from '../validations/changeValidations';

dotenv.config();

class ChangeStatus {
  static async changeStatus(req, res) {
    const head = req.headers.authorization;
    const us = jwt.verify(head, process.env.KEY);
    const cha = await pool.query(queries[0].reportSelect, [req.params.reportId]);
    const { error } = changeStatusSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    if (!cha.rows[0]) {
      return res.status(404).json({
        status: 404,
        message: 'The report is not in the system',
      });
    }
    if (us.role !== 'admin') {
      return res.status(403).json({
        status: 403,
        message: 'You are not allow to change this status as you are not an admin',
      });
    }

    const change = req.body.status;
    await pool.query(`UPDATE reports SET status = '${change}' WHERE reportid = ${req.params.reportId} `);
    return res.status(200).json({
      status: 200,
      data: {
        message: 'The status have been updated successfully',
      },
    });
  }
}

export default ChangeStatus;
