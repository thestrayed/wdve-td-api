import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';

import config from '@config';
import { DatabaseModel, DatabaseConfig, Environments } from '../typings';

const db = {} as DatabaseModel;

const env = (process.env.NODE_ENV || 'development') as Environments;
const databaseConfig = (config as DatabaseConfig)[env];

const sequelize = new Sequelize(databaseConfig);

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') > 0) && (!/index\.[jt]s$/.test(file));
    })
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

export default db;
