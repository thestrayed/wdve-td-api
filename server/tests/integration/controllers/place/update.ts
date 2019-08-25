import faker from 'faker';
import HttpStatus from 'http-status';
import _ from 'lodash';
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

export const updatePlaceIntegrationTest = () => {
    let modelFactory: ModelFactory<PlaceModel, Place>;
    const updateObj: PartialPlace = {
        name: faker.name.title(),
        latitude: parseFloat(faker.address.latitude()),
        longitude: parseFloat(faker.address.longitude()),
    };

    beforeEach(async () => {
        modelFactory = new ModelFactory(db.Place as PlaceModelStatic);
        await modelFactory.destroy();
    });

    afterEach(async () => {
        await modelFactory.destroy();
    });

    it('should return error place not found', async () => {
        const result = await request(app)
            .put(`${URL}/${faker.random.number({ max: 1000 })}`)
            .set('Content-Type', 'application/json')
            .send(updateObj);

        expect(result.body.message).toEqual('Place not found');
        expect(result.status).toEqual(HttpStatus.NOT_FOUND);
    });

    it('should return updated place object', async () => {
        const [model] = await modelFactory.no(LENGTH).create();
        const place = model.toJSON() as Place;
        const result = await request(app)
            .put(`${URL}/${place.id}`)
            .set('Content-Type', 'application/json')
            .send(updateObj);

        expect(
            omitDateTimeFromModel(result.body.data, ['id'])
        ).toEqual(updateObj);
    });
};
