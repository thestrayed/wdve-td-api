import _ from 'lodash';
import Sequelize from 'sequelize';
import Umzug from 'umzug';

import db from '@models';

const umzugMigration = new Umzug({
    storage: 'sequelize',
    storageOptions: {
        sequelize: db.sequelize as Sequelize.Sequelize,
    },
    migrations: {
        params: [
            (db.sequelize as Sequelize.Sequelize).getQueryInterface(),
            db.Sequelize as Sequelize.Sequelize,
        ],
        path: 'migrations',
        pattern: /\.js$/,
    }
});

const OMITTED_FIELDS = [
    'createdAt',
    'updatedAt',
    'deletedAt',
];

/**
 * Up migration scripts
 */
export async function up() {
    await umzugMigration.up();
}

/**
 * Down migration scripts
 */
export async function down() {
    await umzugMigration.down({ to: 0 });
}

/**
 * Omit fields from object
 * @param {Object} obj
 */
export function omitDateTimeFromModel(obj: object, additional: string[] = []): object {
    const mergedOmittedFields = _.concat(OMITTED_FIELDS, additional);
    return _.omit(obj, mergedOmittedFields);
}
