import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://countries.trevorblades.com',
  documents: 'src/**/*.{tsx,graphql}',
  generates: {
    'src/gql/graphql.ts': {
      config: {
        omitOperationSuffix: true,
      },
      plugins: ['typescript', 'typescript-operations'],
    },
  },
};

export default config;
