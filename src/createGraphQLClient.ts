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
