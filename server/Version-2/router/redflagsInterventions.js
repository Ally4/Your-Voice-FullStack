import express from 'express';
import RedflagsAndInterventions from '../controllers/reportsRedflagsInterventions';
import redflagsInterventionMiddle from '../middleware/redflagsInterventionsMiddleware';
import authToken from '../middleware/veryfyToken';
import InUploads from '../middleware/multerUploads';

const redflagsInterventionsRouter = express.Router();


// To post redflags(corruptions) and/or interventions

redflagsInterventionsRouter.post('/api/v2/redflags', redflagsInterventionMiddle, authToken, InUploads, RedflagsAndInterventions.createRedflagsInterventions);

// To get a redflag(corruption) or intervention

redflagsInterventionsRouter.get('/api/v2/redflags/:reportId', redflagsInterventionMiddle, authToken, RedflagsAndInterventions.redflagIntervention);

// To get all the redflags(corruptions) and interventions

redflagsInterventionsRouter.get('/api/v2/redflags', redflagsInterventionMiddle, authToken, RedflagsAndInterventions.allRedflagsInterventions);

// To edit the comment of a report

redflagsInterventionsRouter.patch('/api/v2/redflags/:id/comment', redflagsInterventionMiddle, authToken, RedflagsAndInterventions.updateReportComment);

// To edit the location of the report

redflagsInterventionsRouter.patch('/api/v2/redflags/:id/location', redflagsInterventionMiddle, authToken, RedflagsAndInterventions.updateReportLocation);

// To delete a redflag(corruption) or intervention

redflagsInterventionsRouter.delete('/api/v2/redflags/:id', redflagsInterventionMiddle, authToken, RedflagsAndInterventions.deleteRedflagIntervention);

export default redflagsInterventionsRouter;
