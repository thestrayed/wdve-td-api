import db from '@models';
import { IPlaceService, PlaceModel, PlaceModelStatic } from '@typings';

class PlaceService implements IPlaceService {
    /**
     * Get places
     */
    async all(): Promise<PlaceModel[]> {
        const places = await (db.Place as PlaceModelStatic).findAll();
        return places;
    }

    /**
     * Get place by ID
     */
    async get(id: number): Promise<PlaceModel> {
        const place = await (db.Place as PlaceModelStatic).findByPk(id);
        return place;
    }
}

export default PlaceService;
