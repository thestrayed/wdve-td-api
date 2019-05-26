const jestConfig = require('../../jest.config');

jestConfig.collectCoverageFrom = [
    'erros/*.{js,ts}',
    'lib/*.{js,ts}',
    'services/*.{js,ts}'
];

module.exports = jestConfig;
