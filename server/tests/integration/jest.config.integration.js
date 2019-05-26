const jestConfig = require('../../jest.config');

jestConfig.collectCoverageFrom = [
    'controllers/**/*.{js,ts}',
];

module.exports = jestConfig;
