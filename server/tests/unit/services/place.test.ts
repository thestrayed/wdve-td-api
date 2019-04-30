import { PlaceService } from '@services';

describe('services/place', () => {
    let placeService: PlaceService;

    beforeAll(() => {
        placeService = new PlaceService();
    });

    it('should exist', () => {
        expect(true).toBeTruthy();
    });

    it('should return places', async () => {
        const places = await placeService.all();

        expect([]).toEqual(places);
    });

    it('should return place', async () => {
        const id = 1;
        const place = await placeService.get(id);

        expect({
            id,
            name: 'place',
            latitude: '100',
            longtitude: '100',
        }).toEqual(place);
    });
});
