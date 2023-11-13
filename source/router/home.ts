import { Router } from 'express';

import { home } from '../controllers/';

export default (router: Router) => {
	router.get('/', home);
};
