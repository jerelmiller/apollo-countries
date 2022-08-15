import { ReactNode } from 'react';
import type { GraphQLClient } from '../types';

import GraphQLClientContext from './GraphQLClientContext';

interface GraphQLClientProviderProps {
  children?: ReactNode;
  client: GraphQLClient;
}

const GraphQLClientProvider = ({
  children,
  client,
}: GraphQLClientProviderProps) => {
  return (
    <GraphQLClientContext.Provider value={client}>
      {children}
    </GraphQLClientContext.Provider>
  );
};

export default GraphQLClientProvider;
