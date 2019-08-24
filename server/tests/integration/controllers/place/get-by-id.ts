import HttpStatus from 'http-status';
import request from 'supertest';

import app from '../../../../app';

import ModelFactory from '@factory';
import db from '@models';
import { PlaceModelStatic } from '@typings/models/place';

const LENGTH = 1;
const URL = '/api/places/1';

export const getByIdPlaceIntegrationTest = () => {
    let modelFactory: ModelFactory;

    beforeEach(async () => {
        modelFactory = new ModelFactory(db.Place as PlaceModelStatic);
        await modelFactory.destroy();
    });

    afterEach(async () => {
        await modelFactory.destroy();
    });

    it('should return error place not found', async () => {
        const result = await request(app)
            .get(URL);

        expect(result.body).toEqual(undefined);
        expect(result.status).toEqual(HttpStatus.NOT_FOUND);
    });

    it(`should return list of places with length of ${LENGTH}`, async () => {
        await modelFactory.no(LENGTH).create();
        const result = await request(app)
            .get(URL);

        expect(result.body).toHaveLength(1);
    });
};
