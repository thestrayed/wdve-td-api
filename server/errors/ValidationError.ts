import HttpStatus from 'http-status';

import { ErrorBase, Meta } from '@typings';

class ValidationError extends ErrorBase {
    constructor(
        public message: string,
        public meta: Meta = {},
        public statusCode: number = HttpStatus.BAD_REQUEST,
    ) {
        super(message, meta, statusCode);
    }
}

export default ValidationError;
