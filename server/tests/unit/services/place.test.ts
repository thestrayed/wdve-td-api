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
});
