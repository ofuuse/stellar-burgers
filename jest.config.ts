import type { JestConfigWithTsJest } from 'ts-jest';
import type { Config } from 'jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // настройки для ts-jest
      }
    ]
  },
  coverageDirectory: 'coverage',

  coverageProvider: 'v8'
};

export default config;
