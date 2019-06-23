module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('places', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            latitude: {
                allowNull: false,
                type: Sequelize.DOUBLE
            },
            longitude: {
                allowNull: false,
                type: Sequelize.DOUBLE
            },
            createdAt: {
                allowNull: false,
                defaultValue: queryInterface.sequelize.fn('NOW'),
                field: 'created_at',
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                defaultValue: queryInterface.sequelize.fn('NOW'),
                field: 'updated_at',
                type: Sequelize.DATE,
            },
            deletedAt: {
                field: 'deleted_at',
                type: Sequelize.DATE,
            },
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('places');
    }
};
