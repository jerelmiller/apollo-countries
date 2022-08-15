import { QueryError } from './errors';
import { mergeHeaders } from './utils/headers';
import type { GraphQLError } from './errors';
import type { GraphQLClient, QueryOptions } from './types';

interface GraphQLResponse<TData> {
  data?: TData | null;
  errors?: GraphQLError[] | null;
}

interface Options {
  url: URL | string;
  method?: 'GET' | 'POST';
  headers?: Record<string, string>;
  signal?: AbortSignal;
  requestOptions?: Omit<RequestInit, 'method' | 'headers' | 'body' | 'signal'>;
}

const DEFAULT_HEADERS = {
  'content-type': 'application/json',
};

// Separating out the creation of a GraphQL client from the rest of the
// application allows us to decouple the GraphQL client from the rest of the app
// implementation. While this application is built using React, this GraphQL
// client is generic and can be used in any context. We can build React
// interfaces around the client, to provide nice experiences in React (i.e. hooks),
// but also allow the developer to use the client directly if they so-choose.
//
// Separating it out also allows the possibility of multiple clients to multiple
// endpoints for complex applications.

const createGraphQLClient = ({
  url,
  headers,
  method = 'POST',
  requestOptions,
}: Options): GraphQLClient => {
  return {
    query: async <TData = any, TVariables = Record<string, any>>({
      query,
      variables,
      signal,
    }: QueryOptions<TVariables>) => {
      const response = await window.fetch(url, {
        ...requestOptions,
        method,
        headers: mergeHeaders(DEFAULT_HEADERS, headers),
        body: JSON.stringify({ query, variables }),
        signal,
      });

      if (!response.ok) {
        return Promise.reject(
          new Error(`Server responded with ${response.status}`)
        );
      }

      const { data, errors }: GraphQLResponse<TData> = await response.json();

      if (errors?.length) {
        return Promise.reject(new QueryError(errors));
      }

      if (!data) {
        return Promise.reject(new Error('Server responded with no data'));
      }

      return data;
    },
  };
};

export default createGraphQLClient;
