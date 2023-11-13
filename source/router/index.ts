import { Router } from 'express';

import health from './health.js';
import home from './home.js';

const router = Router();

export default (): Router => {
	health(router);
	home(router);

	return router;
};
