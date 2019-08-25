import faker from 'faker';
import HttpStatus from 'http-status';
import request from 'supertest';

import app from '../../../../app';

import ModelFactory from '@factory';
import db from '@models';
import { omitDateTimeFromModel } from '@tests/utilities/db';
import {
    PartialPlace,
    Place,
    PlaceModel,
    PlaceModelStatic,
} from '@typings/models/place';

const LENGTH = 1;
const URL = '/api/places';

export const getByIdPlaceIntegrationTest = () => {
    let modelFactory: ModelFactory<PlaceModel, Place>;
    const getByIdObj: PartialPlace = {
        name: faker.name.title(),
        latitude: parseFloat(faker.address.latitude()),
        longitude: parseFloat(faker.address.longitude()),
    };

    beforeEach(async () => {
        modelFactory = new ModelFactory(db.Place as PlaceModelStatic, getByIdObj);
        await modelFactory.destroy();
    });

    afterEach(async () => {
        await modelFactory.destroy();
    });

    it('should return error place not found', async () => {
        const result = await request(app)
            .get(`${URL}/${faker.random.number({ max: 1000 })}`);

        expect(result.body.message).toEqual('Place not found');
        expect(result.status).toEqual(HttpStatus.NOT_FOUND);
    });

    it(`should return place`, async () => {
        const [model] = await modelFactory.no(LENGTH).create();
        const place = model.toJSON() as Place;
        await modelFactory.no(LENGTH).create();
        const result = await request(app)
            .get(`${URL}/${place.id}`);

        expect(
            omitDateTimeFromModel(result.body.data, ['id'])
        ).toEqual(getByIdObj);
    });
};
