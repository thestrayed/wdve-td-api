import HttpStatus from 'http-status';
import request from 'supertest';

import app from '../../../../app';

const URL = '/api/health';

describe('GET /api/health', () => {
    it('should return OK status', async () => {
        const result = await request(app)
            .get(URL);

        expect(result.status).toEqual(HttpStatus.OK);
    });
});
