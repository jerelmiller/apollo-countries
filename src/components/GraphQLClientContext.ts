import { createContext } from 'react';
import type { GraphQLClient } from '../types';

const GraphQLClientContext = createContext<GraphQLClient | undefined>(
  undefined
);

export default GraphQLClientContext;
