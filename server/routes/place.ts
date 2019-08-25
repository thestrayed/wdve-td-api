import {
    create,
    createRequestSchema,
    getAll,
    getAllRequestSchema,
    getById,
    getByIdRequestSchema,
    update,
    updateRequestSchema,
} from '@controllers/place';
import { createJoiValidation } from '@middlewares';
import { Route } from '@typings/utilities';

export const placeRoutes: Route[]  = [
    {
        path: '/api/places',
        method: 'GET',
        middleware: [
            createJoiValidation(getAllRequestSchema),
        ],
        handler: getAll,
    },
    {
        path: '/api/places',
        method: 'POST',
        middleware: [
            createJoiValidation(createRequestSchema),
        ],
        handler: create,
    },
    {
        path: '/api/places/:id',
        method: 'GET',
        middleware: [
            createJoiValidation(getByIdRequestSchema),
        ],
        handler: getById,

    },
    {
        path: '/api/places/:id',
        method: 'PUT',
        middleware: [
            createJoiValidation(updateRequestSchema),
        ],
        handler: update,
    },
];
