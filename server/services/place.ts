import { DuplicationError, NotFoundError } from '@errors';
import db from '@models';
import { BaseCreateOptions, BaseFindOptions, BaseUpdateOptions } from '@typings/base';
import { IPlaceService, PartialPlace, PlaceModel, PlaceModelStatic } from '@typings/models/place';

class PlaceService implements IPlaceService<PlaceModel, PartialPlace> {
    async create(createObj: PartialPlace, options: BaseCreateOptions = {}): Promise<PlaceModel> {
        const isExist = await (db.Place as PlaceModelStatic).findOne({ where: createObj });
        if (isExist) {
            throw new DuplicationError('Duplicated place');
        }

        return (db.Place as PlaceModelStatic).create<PlaceModel>(createObj, options);
    }

    async getAll(page: number = 1, pageSize: number = 10, whereObj: PartialPlace = {}): Promise<PlaceModel[]> {
        const options: BaseFindOptions = {
            limit: pageSize,
            offset: (page - 1) * pageSize,
            where: whereObj,
        };

        return (db.Place as PlaceModelStatic).findAll(options);
    }

    async getById(id: number): Promise<PlaceModel> {
        const place = await (db.Place as PlaceModelStatic).findByPk(id);
        if (!place) {
            throw new NotFoundError('Place not found');
        }

        return place;
    }

    async update(updateObj: PartialPlace, whereObj: PartialPlace, options: BaseUpdateOptions = {} as BaseUpdateOptions): Promise<PlaceModel> {
        const sequelizeOptions = {
            ...options,
            returning: true,
            where: whereObj,
        };

        const [count, [place]] = await (db.Place as PlaceModelStatic).update(updateObj, sequelizeOptions);
        if (count === 0) {
            throw new NotFoundError('Place not found');
        }

        return place;
    }
}

export default PlaceService;
