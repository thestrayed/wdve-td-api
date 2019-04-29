import HttpStatus from 'http-status';

import { Meta } from '@typings';

class ValidationError extends Error {
    constructor(
        public message: string,
        public meta: Meta,
        public statusCode: number = HttpStatus.BAD_REQUEST,
    ) {
        super(message);
    }
}

export default ValidationError;
