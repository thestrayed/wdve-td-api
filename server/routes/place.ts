import { all } from '@controllers/place';
import { Route } from '@typings/utilities';

export const placeRoutes: Route[]  = [
    {
        path: '/api/places',
        method: 'GET',
        handler: all,
    }
];
