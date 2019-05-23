import HttpStatus from 'http-status';

import BaseError from './BaseError';

export class NotFoundError extends BaseError {
    protected statusCode: number = HttpStatus.NOT_FOUND;
}
