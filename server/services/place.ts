import db from '@models';
import { IPlaceService, PlaceModel, PlaceModelStatic } from '@typings';

class PlaceService implements IPlaceService {
    async all(): Promise<PlaceModel[]> {
        const places = await (db.Place as PlaceModelStatic).findAll();
        return places;
    }
}

export default PlaceService;
