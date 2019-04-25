import { Model, Options } from 'sequelize';

export type Environments = 'development' | 'test' | 'production';

export interface DatabaseModel {
    [key: string]: typeof Model;
}

export type DatabaseConfig = {
    [key in Environments]?: Options;
};
