import { DataTypes, Sequelize } from 'sequelize';

const Place = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    return sequelize.define('Place', {
        name: {
            type: dataTypes.STRING
        },
        latitude: {
            type: dataTypes.DOUBLE,
        },
        longitude: {
            type: dataTypes.DOUBLE,
        },
        createdAt: {
            allowNull: false,
            defaultValue: Sequelize.fn('NOW'),
            field: 'created_at',
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            defaultValue: Sequelize.fn('NOW'),
            field: 'updated_at',
            type: DataTypes.DATE,
        },
        deletedAt: {
            field: 'deleted_at',
            type: DataTypes.DATE,
        },
    }, {
        tableName: 'places',
        paranoid: true,
    });
};

export default Place;
