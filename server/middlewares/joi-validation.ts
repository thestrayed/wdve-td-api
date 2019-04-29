import { NextFunction, Request, Response } from 'express';
import Joi, { ValidationErrorItem, ValidationOptions } from '@hapi/joi';
import _ from 'lodash';

import { ValidationError } from '@errors';
import { Meta } from '@typings';

const expectedRequestFieldNames: string[] = [
    'body',
    'headers',
    'params',
    'query',
];

function formatJoiErrorDetail(err: ValidationErrorItem): string {
    if (_.isEmpty(err) || !err.message || !err.path) {
        return 'Request parameter is invalid';
    }

    const message = err.message.replace(/"[\w\d]+"/, `${err.path.join('.')}`);
    return message;
}

export function createJoiValidation(schema: object, options: ValidationOptions = { abortEarly: false, allowUnknown: true }) {
    const fieldNameToBeValidated = Object.keys(schema)
        .filter(schemaFieldName => _.includes(expectedRequestFieldNames, schemaFieldName));
    const compiledSchema = Joi.compile(schema);

    return (req: Request, _res: Response, next: NextFunction) => {
        const propertiesToBeValidated = _.pick(req, fieldNameToBeValidated);
        Joi.validate(propertiesToBeValidated, compiledSchema, options, (err, schemaResult) => {
            if (err) {
                const meta: Meta = {};
                const messageDetails = err.details.map((detail) => {
                    const message = formatJoiErrorDetail(detail);
                    detail.path.map((p) => {
                        meta[p] = _.get(propertiesToBeValidated, p);
                    });

                    return message;
                });

                const errMessage = `Validation error: ${messageDetails.join(', ')}`;
                return next(new ValidationError(errMessage, meta));
            }

            req.schema = schemaResult;
            return next();
        });
    };
}
