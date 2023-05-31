import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: 'https://countries.trevorblades.com',
  }),
});
