/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable space-before-blocks */
/* eslint-disable arrow-parens */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import userSignupSchema from '../validations/signupValidators';
import userSigninSchema from '../validations/signinValidators';
import users from '../models/users';

dotenv.config();

class SigninSignup {
  static signup(req, res){
    const { error } = userSignupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    const emailIn = users.find(i => i.email === req.body.email);
    if (emailIn) {
      return res.status(409).json({
        status: 409,
        message: 'The email is already in the system',
      });
    }
    const password = bcrypt.hashSync(req.body.password.trim(), 10);
    const Id = users.length + 1;
    const {
      firstName, lastName, email, phoneNumber, userName,
    } = req.body;
    users.push({
      Id, firstName, lastName, email, password, phoneNumber, userName, role: 'user',
    });
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

  static signin(req, res){
    const { error } = userSigninSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    const user = users.find(e => e.email === req.body.email);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'Same credential must be wrong',
      });
    }
    const comparePassword = bcrypt.compareSync(req.body.password, user.password);
    if (!comparePassword) {
      return res.status(400).json({
        status: 400,
        message: 'One of the information might not be right for you to signin',
      });
    }
    const payload = { email: user.email, role: user.role };
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
