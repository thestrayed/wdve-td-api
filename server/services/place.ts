import _ from 'lodash';

import db from '@models';
import { ModelCreateOptions, ModelFindOptions, ModelUpdateOptions } from '@typings/db';
import { IPlaceService, PartialPlace, Place, PlaceModel, PlaceModelStatic } from '@typings/models/place';
import { DuplicationError, NotFoundError } from '@errors';

class PlaceService implements IPlaceService<PlaceModel, PartialPlace> {
    protected include: Array<object> = [];
    protected number: number;
    protected whereObj: PartialPlace = {};

    /**
     * Create place
     * @param {Place} createObj
     * @param {CreateOptions} [options]
     * @returns {Promise<PlaceModel>}
     */
    async create(createObj: PartialPlace, options: ModelCreateOptions = {}): Promise<PlaceModel> {
        const isExist = await this.where(createObj).limit(1).get();
        if (isExist.length) {
            throw new DuplicationError('Duplicated place');
        }

        const place = await (db.Place as PlaceModelStatic).create(createObj, options);
        return place;
    }

    /**
     * Get place
     * @param {PartialPlace} queryObj
     * @param {ModelFindOptions} [options]
     * @returns {Promise<PlaceModel>}
     */
    async get(): Promise<PlaceModel[]> {
        const options: ModelFindOptions = _.merge({}, {
            include: this.include,
            limit: this.number,
            where: this.whereObj,
        });
        const place = await (db.Place as PlaceModelStatic).findAll(options);
        return place;
    }

    /**
     * @this {PlaceService}
     * @param {Number} number
     * @return {PlaceService}
     */
    limit(number: number = 10): this {
        this.number = number;
        return this;
    }

    /**
     * Update place
     * @param {PartialPlace} updateObj
     * @param {ModelUpdateOptions} options
     * @returns {Promise<PlaceModel>}
     */
    async update(updateObj: PartialPlace, options: ModelUpdateOptions = {} as ModelUpdateOptions): Promise<PlaceModel> {
        const sequelizeOptions: ModelUpdateOptions = _.merge({
            returning: true,
            where: this.whereObj,
        }, options);
        const [count, [place]] = await (db.Place as PlaceModelStatic).update(updateObj, sequelizeOptions);
        if (count === 0) {
            throw new NotFoundError('Place not found');
        }

        return place;
    }

    /**
     * @this {PlaceService}
     * @param {PartialPlace} whereObj
     * @returns {PlaceService}
     */
    where(whereObj: PartialPlace): this {
        this.whereObj = whereObj;
        return this;
    }
}

export default PlaceService;

// function assignToModel(obj, include) {
//     return obj.include
//         ? _.forIn(obj.include, o => assignToModel(o, include))
//         : _.assign(obj, { include });
// }

// function run(models, obj = {}) {
//     const parts = models.split('.');
//     const model = _.capitalize(parts.shift());

//     assignToModel(obj, _.concat([], { model }));

//     return parts.length
//         ? run(parts.join('.'), obj)
//         : obj;
// }
