import HttpStatus from 'http-status';

import BaseError from './BaseError';

export class DuplicationError extends BaseError {
    protected statusCode: number = HttpStatus.CONFLICT;
}
