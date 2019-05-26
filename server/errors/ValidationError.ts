import HttpStatus from 'http-status';

import BaseError from './BaseError';

export class ValidationError extends BaseError {
    protected statusCode: number = HttpStatus.UNPROCESSABLE_ENTITY;
}
