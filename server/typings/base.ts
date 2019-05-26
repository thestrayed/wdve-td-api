import { BuildOptions, CreateOptions, FindOptions, Model, UpdateOptions } from 'sequelize';

export interface BaseBuildOptions extends BuildOptions {}
export interface BaseCreateOptions extends CreateOptions {}
export interface BaseFindOptions extends FindOptions {}
export interface BaseUpdateOptions extends UpdateOptions {}

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
    create(createObj: Optionalize, options: BaseCreateOptions): Promise<BaseModel>;
    get(): Promise<BaseModel[]>;
    limit(number: number): this;
    update(updateObj: Optionalize, options: BaseUpdateOptions): Promise<BaseModel>;
    where(whereObj: Optionalize): this;
}

export type Optionalize<T> = {
    [K in keyof T]?: T[K];
};

export interface SoftDeleteBaseModel {
    deletedAt: string;
}
