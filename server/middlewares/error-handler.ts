import { NextFunction, Response, Request } from 'express';
import HttpStatus from 'http-status';
import _ from 'lodash';

export function errorHandler(err: any, _req: Request, res: Response, next: NextFunction) {
    if (!err) {
        next();
        return;
    }

    const errObj = _.pick(err, 'message', 'meta');
    let { statusCode } = err;

    if (!statusCode) {
        statusCode = err.constructor.name === 'AssertionError'
            ? HttpStatus.BAD_REQUEST
            : HttpStatus.BAD_GATEWAY;
    }

    res.status(statusCode).json(errObj);
}
