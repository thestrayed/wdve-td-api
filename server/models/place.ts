import { DataTypes, Sequelize } from 'sequelize';

const Place = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    return sequelize.define('Place', {
        name: {
            allowNull: false,
            type: dataTypes.STRING
        },
        latitude: {
            allowNull: false,
            type: dataTypes.DOUBLE,
        },
        longitude: {
            allowNull: false,
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
