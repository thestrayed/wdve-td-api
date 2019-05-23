import { BaseModel, BaseModelAttributes, BaseModelStatic, IBaseService, Optionalize, SoftDeleteBaseModel } from '../../base';

export type PartialPlace = Optionalize<Place>;

export interface Place extends BaseModelAttributes {
    name: string;
    latitude: string;
    longitude: string;
}

export interface PlaceModel extends BaseModel<PlaceModel>, Place, SoftDeleteBaseModel {}

export type PlaceModelStatic = BaseModelStatic<PlaceModel>;

export interface IPlaceService<PlaceModel, PartialPlace> extends IBaseService<PlaceModel, PartialPlace> {}
