import { Route, Method } from '../typings';

export const placeRoutes: Route[]  = [
    {
        path: '/api/places',
        method: 'GET',
        middleware: [],
        handler: (_req, res) => {
            res.status(200).json({});
        }
    }
];
