import { Router } from 'express';

import { setRoutes } from '../lib/utilities';

import { placeRoutes } from './place';

const router = Router();

setRoutes(
    router,
    [
        ...placeRoutes,
    ]
);

export default router;
