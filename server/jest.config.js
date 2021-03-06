module.exports = {
    rootDir: '.',
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/tests/',
    ],
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node',
    ],
    moduleNameMapper: {
        '@config': '<rootDir>/config/config.json',
        '@constants/(.*)': '<rootDir>/constants/$1',
        '@controllers/(.*)': '<rootDir>/controllers/$1',
        '@errors': '<rootDir>/errors',
        '@factory': '<rootDir>/tests/factory',
        '@middlewares': '<rootDir>/middlewares',
        '@models': '<rootDir>/models',
        '@routes': '<rootDir>/routes',
        '@services': '<rootDir>/services',
        '@tests/utilities/(.*)': '<rootDir>/tests/utilities/$1',
        '@typings/(.*)': '<rootDir>/typings/$1',
    },
    testEnvironment: 'node',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
