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
                type: Sequelize.STRING
            },
            latitude: {
                type: Sequelize.STRING
            },
            longtitude: {
                type: Sequelize.STRING
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
