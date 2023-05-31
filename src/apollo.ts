import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

export const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Country: {
        keyFields: ['code'],
      },
      Continent: {
        keyFields: ['code'],
      },
    },
  }),
  link: createHttpLink({
    uri: 'https://countries.trevorblades.com',
  }),
});
