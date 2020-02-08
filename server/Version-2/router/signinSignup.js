import express from 'express';
import SigninSignup from '../controllers/signinSignup';

const signRouters = express.Router();

signRouters.post('/api/v2/signup', SigninSignup.signup);

signRouters.post('/api/v2/signin', SigninSignup.signin);

export default signRouters;
