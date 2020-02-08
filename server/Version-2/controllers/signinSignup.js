import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import pool from '../database/configuration';
import queries from '../database/queries';
import { userSignupSchema, userSigninSchema } from '../validations/signupSigninValidations';

dotenv.config();

class SigninSignup {
  static async signup(req, res) {
    const signup = await pool.query(queries[0].signupSigninSelect, [req.body.email]);
    const { error } = userSignupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    if (signup.rows && signup.rows.length > 0) {
      return res.status(409).json({
        status: 409,
        message: 'The email is already in the system',
      });
    }
    const password = bcrypt.hashSync(req.body.password.trim(), 10);
    const {
      firstname, lastname, email, phonenumber, username,
    } = req.body;
    await pool.query(queries[0].insertSignup, [firstname, lastname, email, password, phonenumber, username]);
    const payload = { email, role: 'user' };
    const token = jwt.sign(payload, process.env.KEY);
    return res.status(201).json({
      status: 201,
      message: 'user created successfully',
      data: {
        token,
      },
    });
  }

  static async signin(req, res) {
    const signin1 = await pool.query(queries[0].signupSigninSelect, [req.body.email]);
    const { error } = userSigninSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    if (signin1.rows === 'undefined' || signin1.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'You are not in the system',
      });
    }
    const compare = bcrypt.compareSync(req.body.password, signin1.rows[0].password);
    if (!compare) {
      return res.status(401).json({
        status: 401,
        message: 'Your authentication must be wrong',
      });
    }
    const payload = { email: signin1.rows[0].email, role: signin1.rows[0].role };
    const token = jwt.sign(payload, process.env.KEY);
    return res.status(200).json({
      status: 200,
      message: 'User is successfully logged in!.',
      data: {
        token,
      },
    });
  }
}

export default SigninSignup;
