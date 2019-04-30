export default {
    Place: {
        findByPk: (id: number) => Promise.resolve({
            id: id,
            name: 'place',
            latitude: '100',
            longtitude: '100',
        }),
        findAll: () => Promise.resolve([]),
    }
};
