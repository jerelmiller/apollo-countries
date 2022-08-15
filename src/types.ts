export interface GraphQLClient {
  query: <
    TData = any,
    TVariables extends Record<string, any> = Record<string, any>
  >(
    options: QueryOptions<TVariables>
  ) => Promise<TData>;
}

export interface QueryOptions<TVariables extends Record<string, any>> {
  query: string;
  variables: TVariables;
}
