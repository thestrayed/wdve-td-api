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

export interface IBaseService<BaseModel> {
    create<T>(createObj: Partial<T>, options?: BaseCreateOptions): Promise<BaseModel>;
    get<T>(page?: number, pageSize?: number, whereObj?: Partial<T>): Promise<BaseModel[]>;
    update<T>(updateObj: Partial<T>, whereObj: Partial<T>, options?: BaseUpdateOptions): Promise<BaseModel>;
}

export interface SoftDeleteBaseModel {
    deletedAt: string;
}
