import { BaseModel, BaseModelStatic, SoftDeleteBaseModel } from './base';

export interface PlaceModel extends BaseModel<PlaceModel>, SoftDeleteBaseModel {
    name: string;
    latitude: string;
    longitude: string;
}

export type PlaceModelStatic = BaseModelStatic<PlaceModel>;
