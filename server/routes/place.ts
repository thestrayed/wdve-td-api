import { all, create, createRequestSchema } from '@controllers/place';
import { createJoiValidation } from '@middlewares';
import { Route } from '@typings/utilities';

export const placeRoutes: Route[]  = [
    {
        path: '/api/places',
        method: 'GET',
        handler: all,
    },
    {
        path: '/api/places',
        method: 'POST',
        middleware: [
            createJoiValidation(createRequestSchema),
        ],
        handler: create,
    }
];
