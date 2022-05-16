module.exports = {
  displayName: 'api-shared-infrastructure-domain-event-publisher',

  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory:
    '../../../../../coverage/libs/api/shared/infrastructure/domain-event-publisher',
  preset: '../../../../../jest.preset.ts',
};
