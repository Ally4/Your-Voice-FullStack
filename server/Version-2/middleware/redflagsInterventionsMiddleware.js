import dotenv from 'dotenv';

dotenv.config();

const redflagsInterventionMiddle = (req, res, next) => {
  const header = req.headers.authorization;
  if (typeof header !== 'undefined') {
    req.token = header;
    next();
  } else {
    res.status(401).json({
      status: 401,
      message: 'You have to put a token into the header',
    });
  }
};

export default redflagsInterventionMiddle;
