import faker from 'faker';
import HttpStatus from 'http-status';
import _ from 'lodash';
import request from 'supertest';

import app from '../../../../app';

import ModelFactory from '@factory';
import db from '@models';
import { omitDateTimeFromModel } from '@tests/utilities/db';
import { ErrorText } from '@typings/errors';
import { PartialPlace, PlaceModelStatic } from '@typings/models/place';

const LENGTH = 1;
const URL = '/api/places';

export const createPlaceIntegrationTest = () => {
    let modelFactory: ModelFactory;
    const createObj: PartialPlace = {
        name: faker.name.title(),
        latitude: parseFloat(faker.address.latitude()),
        longitude: parseFloat(faker.address.longitude()),
    };

    beforeEach(async () => {
        modelFactory = new ModelFactory(db.Place as PlaceModelStatic, createObj);
        await modelFactory.destroy();
    });

    afterEach(async () => {
        await modelFactory.destroy();
    });

    it('should return error request body validation fails (Unprocessable entity)', async () => {
        const result = await request(app)
            .post(URL)
            .set('Content-Type', 'application/json')
            .send(
                _.omit(createObj, 'name'),
            );
        expect(result.error.status).toEqual(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should return newly create place object', async () => {
        const result = await request(app)
            .post(URL)
            .set('Content-Type', 'application/json')
            .send(createObj);

        expect(
            omitDateTimeFromModel(result.body.data.place, ['id'])
        ).toEqual(createObj);
    });

    it('should return error duplciated place (Conflict)', async () => {
        await modelFactory.no(LENGTH).create();
        const result = await request(app)
            .post(URL)
            .set('Content-Type', 'application/json')
            .send(createObj);

        expect(result.error.status).toEqual(HttpStatus.CONFLICT);
        const errText: ErrorText = JSON.parse(result.error.text) as ErrorText;
        expect(errText.message).toEqual('Duplicated place');
    });
};
