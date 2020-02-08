import express from 'express';
import ChangeStatus from '../controllers/changeStatus';
import redflagsInterventionMiddle from '../middleware/redflagsInterventionsMiddleware';
import authToken from '../middleware/veryfyToken';

const patchStatusRouter = express.Router();


// To change the status of a redflag(corruption) or intervention

patchStatusRouter.patch('/api/v2/redflags/:reportId', redflagsInterventionMiddle, authToken, ChangeStatus.changeStatus);

export default patchStatusRouter;
