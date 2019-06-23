import { up, down } from '@tests/utilities/db';

import { allPlacesIntegrationTest } from './all';
import { createPlaceIntegrationTest } from './create';

beforeAll(async () => {
    await up();
});

afterAll(async () => {
    await down();
});

describe('GET /places', allPlacesIntegrationTest);
describe('POST /places', createPlaceIntegrationTest);
