import HttpStatus from 'http-status';
import request from 'supertest';

import app from '../../../../app';

import ModelFactory from '@factory';
import db from '@models';
import { up, down, omitDateTimeFromModel } from '@tests/utilities/db';
import { PlaceModelStatic } from '@typings/models/place';

describe('GET /places', () => {
    let modelFactory: ModelFactory;

    const LENGTH = 3;

    beforeAll(async () => {
        await up();
    });

    beforeEach(() => {
        modelFactory = new ModelFactory(db.Place as PlaceModelStatic);
    });

    afterAll(async () => {
        await down();
    });

    it('should return empty list of places', async () => {
        const result = await request(app)
            .get('/api/places');

        expect(result.body).toEqual([]);
        expect(result.status).toEqual(HttpStatus.OK);
    });

    it(`should return list of places with length of ${LENGTH}`, async () => {
        const places = await modelFactory
            .no(LENGTH)
            .create();

        const result = await request(app)
            .get('/api/places');

        expect(result.body).toHaveLength(3);
        places.forEach((place, i) => {
            expect(
                omitDateTimeFromModel(result.body[i])
            ).toEqual(
                omitDateTimeFromModel(place.toJSON())
            );
        });
    });
});
