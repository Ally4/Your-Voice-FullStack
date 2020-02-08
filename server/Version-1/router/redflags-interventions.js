import express from 'express';
import RedflagsAndInterventions from '../controllers/reportsRedflags-interventions';
import redflagsInterventionmiddle from '../middleware/redflagsInterventions-middleware';
import authToken from '../middleware/veryfyToken';
import InUploads from '../middleware/multerUploads'

const redflagsInterventionsRouter = express.Router();


// To get all the redflags(corruptions) and interventions

redflagsInterventionsRouter.post('/api/v1/redflags', redflagsInterventionmiddle, authToken, InUploads, RedflagsAndInterventions.createRedflagsInterventions);

// To get all the redflags(corruptions) and interventions

redflagsInterventionsRouter.get('/api/v1/redflags', redflagsInterventionmiddle, authToken, RedflagsAndInterventions.allRedflagsInterventions);

// To get a redflag(corruption) or intervention

redflagsInterventionsRouter.get('/api/v1/redflags/:reportId', redflagsInterventionmiddle, authToken, RedflagsAndInterventions.redflagIntervention);

// To edit the location of the report

redflagsInterventionsRouter.patch('/api/v1/redflags/:id/location', redflagsInterventionmiddle, authToken, RedflagsAndInterventions.updateReportLocation);

// To edit the comment of a report

redflagsInterventionsRouter.patch('/api/v1/redflags/:id/comment', redflagsInterventionmiddle, authToken, RedflagsAndInterventions.updateReportComment);

// To delete a redflag(corruption) or intervention

redflagsInterventionsRouter.delete('/api/v1/redflags/:id', redflagsInterventionmiddle, authToken, RedflagsAndInterventions.deleteRedflagIntervention);


export default redflagsInterventionsRouter;