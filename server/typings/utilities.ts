import { NextFunction, Request, RequestHandler, Response } from 'express';

export type Method = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH';
export type MethodLowercase = 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch';

export type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => void;

export interface Route {
    path: string;
    method: Method;
    middleware?: any[];
    handler: RequestHandler;
}
