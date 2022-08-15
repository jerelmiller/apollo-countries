import { QueryError } from './errors';
import normalizeHeaders from './utils/normalizeHeaders';
import type { GraphQLError } from './errors';

interface GraphQLResponse<TData> {
  data?: TData | null;
  errors?: GraphQLError[] | null;
}

interface QueryOptions<TVariables extends Record<string, any>> {
  query: string;
  variables: TVariables;
}

export interface GraphQLClient {
  query: <
    TData = any,
    TVariables extends Record<string, any> = Record<string, any>
  >(
    options: QueryOptions<TVariables>
  ) => Promise<TData>;
}

interface ClientOptions {
  url: string;
  method?: 'GET' | 'POST';
  headers?: Record<string, string>;
  requestOptions?: Omit<RequestInit, 'method' | 'headers' | 'body'>;
}

const DEFAULT_HEADERS = {
  'content-type': 'application/json',
};

const createGraphQLClient = ({
  url,
  method,
  headers,
  requestOptions,
}: ClientOptions): GraphQLClient => {
  return {
    query: async <TData = any, TVariables = Record<string, any>>({
      query,
      variables,
    }: QueryOptions<TVariables>) => {
      const response = await window.fetch(url, {
        ...requestOptions,
        method,
        headers: { ...DEFAULT_HEADERS, ...normalizeHeaders(headers) },
        body: JSON.stringify({ query, variables }),
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
        return Promise.reject(new Error('Could not get data'));
      }

      return data;
    },
  };
};

export default createGraphQLClient;
