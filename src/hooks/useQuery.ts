import { useEffect, useReducer, Reducer } from 'react';
import { QueryError } from '../errors';
import useDeepMemo from './useDeepMemo';
import useGraphQLClient from './useGraphQLClient';

interface Options<
  TVariables extends Record<string, any> = Record<string, any>
> {
  variables?: TVariables;
}

type ErrorType = Error | QueryError;

export enum Status {
  LOADING = 'loading',
  COMPLETE = 'complete',
  ERROR = 'error',
}

enum ActionType {
  Fetch,
  Error,
  Complete,
}

const initialState: State<undefined> = {
  data: undefined,
  error: undefined,
  status: Status.LOADING,
};

type Action<TData = any> =
  | { type: ActionType.Fetch }
  | { type: ActionType.Error; payload: ErrorType }
  | { type: ActionType.Complete; payload: TData };

type State<TData = any> =
  | { status: Status.LOADING; data: undefined; error: undefined }
  | { status: Status.COMPLETE; data: TData; error: undefined }
  | { status: Status.ERROR; data: undefined; error: ErrorType };

const reducer = <TData = any>(_state: State<TData>, action: Action<TData>) => {
  switch (action.type) {
    case ActionType.Fetch:
      return { status: Status.LOADING, data: undefined, error: undefined };
    case ActionType.Complete:
      return {
        status: Status.COMPLETE,
        data: action.payload,
        error: undefined,
      };
    case ActionType.Error:
      return { status: Status.ERROR, data: undefined, error: action.payload };
  }
};

const useQuery = <
  TData = any,
  TVariables extends Record<string, any> = Record<string, any>
>(
  query: string,
  options?: Options<TVariables>
) => {
  const [state, dispatch] = useReducer<Reducer<State<TData>, Action<TData>>>(
    reducer as Reducer<State<TData>, Action<TData>>,
    initialState
  );
  const { variables } = options ?? {};

  const client = useGraphQLClient();
  const body = useDeepMemo(() => ({ query, variables }), [query, variables]);

  useEffect(() => {
    const controller = new AbortController();

    dispatch({ type: ActionType.Fetch });

    client
      .query<TData, TVariables>({ ...body, signal: controller.signal })
      .then((data) => dispatch({ type: ActionType.Complete, payload: data }))
      .catch((error: Error | QueryError) => {
        if (error.name === 'AbortError') {
          return;
        }

        dispatch({ type: ActionType.Error, payload: error });
      });

    return () => {
      controller.abort();
    };
  }, [client, body]);

  return state;
};

useQuery.STATUS = Status;

export default useQuery;
