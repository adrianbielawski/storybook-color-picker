module.exports = {
  testEnvironment: 'jest-environment-jsdom-global',
  testEnvironmentOptions: {
    url: 'http://localhost'
  },
  modulePaths: ['<rootDir>/src/'],
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '^src/(.*)$':  '<rootDir>/src/$1',
  }, 
};