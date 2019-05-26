import { Meta } from '@typings/errors';

export default abstract class BaseError extends Error {
    protected statusCode: number;

    constructor(
        public message: string,
        public meta: Meta = {},
    ) {
        super(message);
    }

    getStatusCode() {
        return this.statusCode;
    }
}
