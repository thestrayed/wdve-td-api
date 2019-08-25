import { NextFunction, Request, Response } from 'express';

import { up, down } from '@tests/utilities/db';

import { createPlaceIntegrationTest } from './create';
import { getAllPlacesIntegrationTest } from './get-all';
import { getByIdPlaceIntegrationTest } from './get-by-id';
import { updatePlaceIntegrationTest } from './update';

jest.mock('../../../../middlewares/jwt-validation', () => ({
    jwtValidation: jest.fn().mockReturnValue((_req: Request, _res: Response, next: NextFunction) => {
        next();
    }),
}));

beforeAll(async () => {
    await up();
});

afterAll(async () => {
    await down();
});

describe('POST /places', createPlaceIntegrationTest);
describe('GET /places', getAllPlacesIntegrationTest);
describe('GET /places/:id', getByIdPlaceIntegrationTest);
describe('PUT /places/:id', updatePlaceIntegrationTest);
