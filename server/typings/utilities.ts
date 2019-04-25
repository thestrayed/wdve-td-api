import { RequestHandler } from 'express';

export type Method = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH';
export type MethodLowercase = 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch';

export interface Route {
    path: string;
    method: Method;
    middleware?: any[];
    handler: RequestHandler;
}
