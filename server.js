import express from 'express';
import bodyParser from 'body-parser';
import signRouters from './server/Version-2/router/signinSignup';
import redflagsInterventionsRouter from './server/Version-2/router/redflagsInterventions';
import patchStatusRouter from './server/Version-2/router/changeStatusRouter';

const app = express();

app.use(express.json());

app.use(bodyParser.json());


// The router for signin and signup

app.use('/', signRouters);

// The router for redflags(corruptions) and interventions

app.use('/', redflagsInterventionsRouter);


// The router for changing a redflags(corruptions) or interventions status

app.use('/', patchStatusRouter);

const port = process.env.PORT || 1234;

app.listen(port, () => {
  console.log(`The app is running on ${port}`);
});

module.exports = app;
