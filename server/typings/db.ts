import Sequelize, { Model, Options } from 'sequelize';

export type Environments = 'development' | 'test' | 'production';

export interface DatabaseModel {
    [key: string]: typeof Model | typeof Sequelize | Sequelize.Sequelize;
}

export type DatabaseConfig = {
    [key in Environments]?: Options;
};
