import { up, down } from '@tests/utilities/db';

import { createPlaceIntegrationTest } from './create';
import { getAllPlacesIntegrationTest } from './get-all';
import { getByIdPlaceIntegrationTest } from './get-by-id';

beforeAll(async () => {
    await up();
});

afterAll(async () => {
    await down();
});

describe('POST /places', createPlaceIntegrationTest);
describe('GET /places', getAllPlacesIntegrationTest);
describe('GET /places/:id', getByIdPlaceIntegrationTest);
