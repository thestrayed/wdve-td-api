import { BuildOptions, Model } from 'sequelize';

import { ModelCreateOptions, ModelUpdateOptions } from './db';

export interface BaseModel<T> extends Model<T>  {
    createdAt: string;
    updatedAt: string;
}

export interface BaseModelAttributes {
    id: number;
}

export type BaseModelStatic<T> = typeof Model & {
    new(values?: object, options?: BuildOptions): T;
};

/**
 * @template BaseModel
 * @template Optionalize
 */
export interface IBaseService<BaseModel, Optionalize> {
    create(createObj: Optionalize, options: ModelCreateOptions): Promise<BaseModel>;
    get(): Promise<BaseModel[]>;
    limit(number: number): this;
    update(updateObj: Optionalize, options: ModelUpdateOptions): Promise<BaseModel>;
    where(whereObj: Optionalize): this;
}

export type Optionalize<T> = {
    [K in keyof T]?: T[K];
};

export interface SoftDeleteBaseModel {
    deletedAt: string;
}
