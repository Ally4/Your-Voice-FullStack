/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authToken = (req, res, next) => {
  jwt.verify(req.token, process.env.KEY, (err, InUser) => {
    if (err) {
      return res.status(401).json({
        status: 401,
        error: 'Your token has a problem, check it again',
      });
    }
    next();
  });
};

export default authToken;
