import { CreateOptions, FindOptions, Model, Options, UpdateOptions } from 'sequelize';

export type Environments = 'development' | 'test' | 'production';

export interface DatabaseModel {
    [key: string]: typeof Model;
}

export type DatabaseConfig = {
    [key in Environments]?: Options;
};

export interface ModelCreateOptions extends CreateOptions {}
export interface ModelFindOptions extends FindOptions {}
export interface ModelUpdateOptions extends UpdateOptions {}
