/* eslint-disable linebreak-style */
import express from 'express';
import SigninSignup from '../controllers/signin-signup';

const signRouters = express.Router();

signRouters.post('/api/v1/signup', SigninSignup.signup);

signRouters.post('/api/v1/signin', SigninSignup.signin);

export default signRouters;
