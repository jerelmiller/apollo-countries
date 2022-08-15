import { useContext } from 'react';
import GraphQLClientContext from '../components/GraphQLClientContext';

// This hook is provided as a low-level hook. It powers the `useQuery` hook in
// this app as well, which is the more developer-friendly API for executing a
// GraphQL query against the server.
//
// Providing a separate hook allows the developer to use the GraphQL client
// directly if an escape hatch is needed for whatever reason.

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
