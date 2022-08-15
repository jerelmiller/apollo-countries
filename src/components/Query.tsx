import useQuery from '../hooks/useQuery';

interface QueryProps<
  TData = any,
  TVariables extends Record<string, any> = Record<string, any>
> {
  children: (result: ReturnType<typeof useQuery<TData>>) => JSX.Element;
  query: string;
  variables?: TVariables;
}

// Creating a Query component allows us to cater to developers that may prefer
// components over hooks. This can also enable developers that may need to work
// around the limitations of hooks, for example, when conditionally rendering
// something.
const Query = ({ children, query, variables }: QueryProps) => {
  const result = useQuery(query, { variables });

  return children(result);
};

Query.STATUS = useQuery.STATUS;

export default Query;
