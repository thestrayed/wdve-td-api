import { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response, Router } from 'express';
import _ from 'lodash';

import { MethodLowercase, Route } from '@typings/utilities';

function isAsyncFunction(fn: Function): Boolean {
    return typeof fn === 'function' && fn.constructor && fn.constructor.name === 'AsyncFunction';
}

function wrap(fn: ErrorRequestHandler): ErrorRequestHandler;
function wrap(fn: RequestHandler): RequestHandler;
function wrap(fn: any): any {
    if (!isAsyncFunction(fn)) {
        return fn;
    }

    if (fn.length === 4) {
        return (err: any, req: Request, res: Response, next: NextFunction): ErrorRequestHandler => fn(err, req, res, next).catch(next);
    }

    return (req: Request, res: Response, next: NextFunction): RequestHandler => fn(req, res, next).catch(next);
}

function wrapAll(fns: RequestHandler[]): RequestHandler[];
function wrapAll(fns: ErrorRequestHandler[]): ErrorRequestHandler[];
function wrapAll(fns: any[]): any[] {
    return _.map(fns, fn => wrap(fn));
}

export function setRoutes(router: Router, routes: Route[]): void {
    routes.forEach((route) => {
        let args = [];

        if (route.middleware) {
            args.push(wrapAll(route.middleware));
        }

        args.push(wrap(route.handler));

        args = _.flatten(args);

        router[route.method.toLowerCase() as MethodLowercase](route.path, ...args);
    });
}
