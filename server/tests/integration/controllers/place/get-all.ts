import HttpStatus from 'http-status';
import request from 'supertest';

import app from '../../../../app';

import ModelFactory from '@factory';
import db from '@models';
import { PlaceModelStatic } from '@typings/models/place';

const LENGTH = 3;
const URL = '/api/places';

export const getAllPlacesIntegrationTest = () => {
    let modelFactory: ModelFactory;

    beforeEach(async () => {
        modelFactory = new ModelFactory(db.Place as PlaceModelStatic);
        await modelFactory.destroy();
    });

    afterEach(async () => {
        await modelFactory.destroy();
    });

    it('should return empty list of places', async () => {
        const result = await request(app)
            .get(URL);

        expect(result.body.data).toEqual([]);
        expect(result.status).toEqual(HttpStatus.OK);
    });

    it(`should return list of places with length of ${LENGTH}`, async () => {
        await modelFactory.no(LENGTH).create();
        const result = await request(app)
            .get(URL);

        expect(result.body.data).toHaveLength(3);
    });
};
