import faker from 'faker';
import _ from 'lodash';

import db from '@models';
import { PlaceService } from '@services';
import { PartialPlace, PlaceModelStatic, PlaceModel } from '@typings/models/place';

jest.mock('@models', () => ({
    Place: {
        create: (createObj: PartialPlace) => Promise.resolve(_.merge({ id: faker.random.number(10) }, createObj)),
        findAll: jest.fn(),
        update: jest.fn(),
    },
}));

describe('services/place', () => {
    let placeService: PlaceService;

    const DEFAULT_LIMIT = 10;

    const id = 1;
    const placeObj: PartialPlace = {
        name: faker.name.title(),
        latitude: parseFloat(faker.address.latitude()),
        longitude: parseFloat(faker.address.longitude()),
    };

    beforeAll(() => {
        placeService = new PlaceService();
    });

    it('should exist', () => {
        expect(placeService).toBeTruthy();
    });

    it('should throw an error (Duplicated place)', async () => {
        const result = _.merge({}, { id }, placeObj) as PlaceModel;
        (db.Place as jest.Mocked<PlaceModelStatic>)
            .findAll.mockResolvedValue([result]);

        try {
            await placeService.create(placeObj);
        } catch (err) {
            expect(err.message).toEqual('Duplicated place');
        }
    });

    it('should create place', async () => {
        (db.Place as jest.Mocked<PlaceModelStatic>)
            .findAll.mockResolvedValue([]);

        const place = await placeService.create(placeObj);
        expect(_.omit(place, 'id')).toEqual(placeObj);
    });

    it('should return empty place', async () => {
        (db.Place as jest.Mocked<PlaceModelStatic>)
            .findAll.mockResolvedValue([]);

        const places = await placeService.get();
        expect([]).toEqual(places);
    });

    it(`should return places with default limit of ${DEFAULT_LIMIT}`, async () => {
        const result = Array(DEFAULT_LIMIT).fill(_.merge({}, { id }, placeObj)) as PlaceModel[];
        (db.Place as jest.Mocked<PlaceModelStatic>)
            .findAll.mockResolvedValue(result);

        const places = await placeService.limit().where({ id }).get();
        expect(result).toEqual(places);
        expect(result).toHaveLength(DEFAULT_LIMIT);
    });

    it('should return place with limit of 1', async () => {
        const result = _.merge({}, { id }, placeObj) as PlaceModel;
        (db.Place as jest.Mocked<PlaceModelStatic>)
            .findAll.mockResolvedValue([result]);

        const [place] = await placeService.limit(1).where({ name: placeObj.name }).get();
        expect(result).toEqual(place);
    });

    it('should throw an error (Place not found)', async () => {
        const result = _.merge({}, { id }, placeObj) as PlaceModel;
        (db.Place as jest.Mocked<PlaceModelStatic>)
            .update.mockResolvedValue([0, [result]]);

        try {
            await placeService.where({ id }).update(placeObj);
        } catch (err) {
            expect(err.message).toEqual('Place not found');
        }
    });

    it('should update place by using where query', async () => {
        const result = _.merge({}, { id }, placeObj) as PlaceModel;
        (db.Place as jest.Mocked<PlaceModelStatic>)
            .update.mockResolvedValue([1, [result]]);

        const place = await placeService.update(placeObj);
        expect(result).toEqual(place);
    });
});
