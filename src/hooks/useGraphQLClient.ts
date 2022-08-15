import { useContext } from 'react';
import GraphQLClientContext from '../components/GraphQLClientContext';

const useGraphQLClient = () => {
  const client = useContext(GraphQLClientContext);

  if (!client) {
    throw new Error(
      'A GraphQL client has not been initialized. Please create a GraphQL client and provide it to via the GraphQLClientProvider.'
    );
  }

  return client;
};

export default useGraphQLClient;
