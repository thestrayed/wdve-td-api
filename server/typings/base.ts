import { BuildOptions, Model } from 'sequelize';

export interface BaseModel<T> extends Model<T>  {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export type BaseModelStatic<T> = typeof Model & {
    new(values?: object, options?: BuildOptions): T;
};

export interface SoftDeleteBaseModel {
    deletedAt: string;
}
