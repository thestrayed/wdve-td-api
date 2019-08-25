import { NextFunction, Response, Request } from 'express';
import HttpStatus from 'http-status';

import { ASSERTION_ERROR, UNAUTHORIZED_ERROR } from '@constants/error';

export function errorHandler(err: any, _req: Request, res: Response, next: NextFunction): Response {
    if (!err) {
        next();
        return;
    }

    const { message, meta } = err;
    let { statusCode } = err;

    if (!statusCode) {
        switch (err.constructor.name) {
            case ASSERTION_ERROR:
                statusCode = HttpStatus.BAD_REQUEST;
                break;
            case UNAUTHORIZED_ERROR:
                statusCode = HttpStatus.UNAUTHORIZED;
                break;
            default:
                statusCode = HttpStatus.BAD_GATEWAY;
                break;
        }
    }

    return res.status(statusCode).json({ message, meta });
}
