import useQuery from '../hooks/useQuery';

interface QueryProps<
  TData = any,
  TVariables extends Record<string, any> = Record<string, any>
> {
  children: (result: ReturnType<typeof useQuery<TData>>) => JSX.Element;
  query: string;
  variables?: TVariables;
}

const Query = ({ children, query, variables }: QueryProps) => {
  const result = useQuery(query, { variables });

  return children(result);
};

export default Query;
