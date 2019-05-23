import { Router } from 'express';

import { all } from '@controllers/place';

import { errorHandler } from '@middlewares';
import { Route } from '@typings/utilities';

import { setRoutes } from '../../../lib/utilities';

describe('lib/utilities', () => {
    let router: Router;

    beforeEach(() => {
        router = Router();
    });

    it('should return router with new path and method along with handler but without middleware', () => {
        const spyRouter = jest.spyOn(router, 'get');
        const routes: Route[] = [
            {
                path: '/api',
                method: 'GET',
                handler: (_req, res) => res.send('hi'),
            },
        ];
        setRoutes(router, routes);
        expect(spyRouter).toBeCalled();
        expect(router.stack[0].route.path).toEqual('/api');
        expect(router.stack[0].route.stack[0].method).toEqual('get');
        expect(router.stack[0].route.stack[0].name).toEqual('handler');
    });

    it('should return router with new path and method along with middleware and handler', () => {
        const spyRouter = jest.spyOn(router, 'get');
        const routes: Route[] = [
            {
                path: '/api',
                method: 'GET',
                middleware: [
                    errorHandler
                ],
                handler: (_req, res) => res.send('hi'),
            }
        ];
        setRoutes(router, routes);
        expect(spyRouter).toBeCalled();
        expect(router.stack[0].route.path).toEqual('/api');
        expect(router.stack[0].route.stack[0].method).toEqual('get');
        expect(router.stack[0].route.stack[0].name).toEqual('errorHandler');
        expect(router.stack[0].route.stack[1].name).toEqual('handler');
    });

    it('should return router with new path and method along with async handler', () => {
        const spyRouter = jest.spyOn(router, 'get');
        const routes: Route[] = [
            {
                path: '/api',
                method: 'GET',
                handler: all,
            }
        ];
        setRoutes(router, routes);
        expect(spyRouter).toBeCalled();
        expect(router.stack[0].route.path).toEqual('/api');
        expect(router.stack[0].route.stack[0].method).toEqual('get');
    });
});
