import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

import config from '@config';
import { DatabaseModel, DatabaseConfig, Environments } from '@typings/db';

const db = {} as DatabaseModel;

const env = process.env.NODE_ENV as Environments;
const databaseConfig = (config as DatabaseConfig)[env];

const sequelize = new Sequelize.Sequelize(databaseConfig);

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') > 0) && (!/index\.[jt]s$/.test(file));
    })
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
