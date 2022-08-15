interface GraphQLErrorLocation {
  line: number;
  column: number;
}

type GraphQLErrorPathEntry = string | number;

export interface GraphQLError {
  message: string;
  location?: GraphQLErrorLocation[];
  path?: GraphQLErrorPathEntry[];
}

export class QueryError extends Error {
  errors: GraphQLError[];

  constructor(errors: GraphQLError[]) {
    super('');
    this.name = 'QueryError';
    this.errors = errors;
  }
}
