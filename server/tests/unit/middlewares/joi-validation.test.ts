import { Response, Request } from 'express';
import Joi from '@hapi/joi';
import HttpMocks from 'node-mocks-http';

import { ValidationError } from '@errors';
import { createJoiValidation } from '@middlewares';

describe('middlewares/joi-validation', () => {
    let req: HttpMocks.MockRequest<Request>;
    let res: HttpMocks.MockResponse<Response>;

    beforeEach(() => {
        res = HttpMocks.createResponse();
    });

    it('should exist', () => {
        expect(true).toBeTruthy();
    });

    it('should skip validation if no schema is provided', () => {
        const schema = {};
        req = HttpMocks.createRequest();
        const validation = createJoiValidation(schema);

        validation(req, res, (err) => {
            expect(err).toBeUndefined();
        });
    });

    it('should return error if the query validation fails', () => {
        const schema = {
            query: {
                startDate: Joi.string().required(),
                endDate: Joi.string().required(),
            },
        };
        const req = HttpMocks.createRequest({
            query: {
                startDate: '',
                endDate: '',
            },
        });
        const validation = createJoiValidation(schema);

        validation(req, res, (err) => {
            expect(err).toBeInstanceOf(ValidationError);
        });
    });

    it('should return no error if the query validation passes', () => {
        const schema = {
            query: {
                startDate: Joi.string().required(),
                endDate: Joi.string().required(),
            },
        };
        const req = HttpMocks.createRequest({
            query: {
                startDate: '2019-04-01',
                endDate: '2019-04-05',
            },
        });
        const validation = createJoiValidation(schema);

        validation(req, res, (err) => {
            expect(err).toBeUndefined();
        });
    });

    it('should return error if the params validation fails', () => {
        const schema = {
            params: {
                startDate: Joi.string().required(),
                endDate: Joi.string().required(),
            },
        };
        const req = HttpMocks.createRequest({
            params: {
                startDate: '',
                endDate: '',
            },
        });
        const validation = createJoiValidation(schema);

        validation(req, res, (err) => {
            expect(err).toBeInstanceOf(ValidationError);
        });
    });

    it('should return no error if the params validation passes', () => {
        const schema = {
            params: {
                startDate: Joi.string().required(),
                endDate: Joi.string().required(),
            },
        };
        const req = HttpMocks.createRequest({
            params: {
                startDate: '2019-04-01',
                endDate: '2019-04-05',
            },
        });
        const validation = createJoiValidation(schema);

        validation(req, res, (err) => {
            expect(err).toBeUndefined();
        });
    });

    it('should return error if the body validation fails', () => {
        const schema = {
            body: {
                startDate: Joi.string().required(),
                endDate: Joi.string().required(),
            },
        };
        const req = HttpMocks.createRequest({
            body: {
                startDate: '',
                endDate: '',
            },
        });
        const validation = createJoiValidation(schema);

        validation(req, res, (err) => {
            expect(err).toBeInstanceOf(ValidationError);
        });
    });

    it('should return no error if the body validation passes', () => {
        const schema = {
            body: {
                startDate: Joi.string().required(),
                endDate: Joi.string().required(),
            },
        };
        const req = HttpMocks.createRequest({
            body: {
                startDate: '2019-04-01',
                endDate: '2019-04-05',
            },
        });
        const validation = createJoiValidation(schema);

        validation(req, res, (err) => {
            expect(err).toBeUndefined();
        });
    });
});
