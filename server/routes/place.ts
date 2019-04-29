import { createJoiValidation } from '@middlewares';
import { Route } from '@typings';

export const placeRoutes: Route[]  = [
    {
        path: '/api/places',
        method: 'GET',
        middleware: [
            createJoiValidation({}),
        ],
        handler: (_req, res) => {
            res.status(200).json({});
        }
    }
];
