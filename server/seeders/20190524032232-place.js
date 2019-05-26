module.exports = {
    up: queryInterface => queryInterface.bulkInsert('places', [
            {
                name: 'Roots at the COMMONS',
                latitude: 13.7351657,
                longitude: 100.5821809,
            },
            {
                name: 'Brave Roasters : Space Oddity',
                latitude: 13.7333917,
                longitude: 100.5812794,
            },
            {
                name: 'City boy coffee stand',
                latitude: 13.7281499,
                longitude: 100.5816844
            }
        ], {}),
    down: queryInterface =>  queryInterface.bulkDelete('places', null, {}),
};
