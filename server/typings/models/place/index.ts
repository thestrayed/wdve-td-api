import { BaseModel, BaseModelAttributes, BaseModelStatic, IBaseService, SoftDeleteBaseModel } from '../../base';

export type PartialPlace = Partial<Place>;

export interface Place extends BaseModelAttributes {
    name: string;
    latitude: number;
    longitude: number;
}

export interface PlaceModel extends BaseModel<PlaceModel>, Place, SoftDeleteBaseModel {}

export type PlaceModelStatic = BaseModelStatic<PlaceModel>;

export interface IPlaceService<PlaceModel, PartialPlace> extends IBaseService<PlaceModel> {}
