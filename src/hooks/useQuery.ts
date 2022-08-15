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

// I tend to think of network requests as state machines that can only exist in
// a single state at once. Rather than modeling our requests using boolean flags
// (such as a `loading` flag), we use a status instead.
//
// This can have some advantages:
//  * We can model our state type using a discriminated union to more
//    effectively communicate each state property (for example, we know `error`
//    is a non-nullable value when the `status` is `error`)
//  * Developers that prefer `switch` statements can more easily use them as we
//    don't need to analyze multiple pieces of data to determine what state we
//    are in
//  * We can more effectively communicate complex statuses for future features.
//    For example, if we want to add support for polling and we want the
//    developer to determine the difference between a refetch and the initial
//    fetch, we can easily add a status that differentiates between the two.

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

// Using a reducer allows us to more effectively model what is happening during
// our request. This state is highly clustered together. While we could use
// 3 `useState` hooks to implement this, the reducer tends to be a bit
// more declarative.
const reducer = <TData = any>(
  _state: State<TData>,
  action: Action<TData>
): State<TData> => {
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
    reducer,
    initialState
  );
  const { variables } = options ?? {};

  const client = useGraphQLClient();
  const body = useDeepMemo(() => ({ query, variables }), [query, variables]);

  useEffect(() => {
    // Using an abort controller can help us cancel a previous request if the
    // component is about to unmount, or we are about to refetch. By cancelling
    // the previous request, we can avoid race conditions in our data.
    const controller = new AbortController();

    dispatch({ type: ActionType.Fetch });

    client
      .query<TData, TVariables>({ ...body, signal: controller.signal })
      .then((data) => dispatch({ type: ActionType.Complete, payload: data }))
      .catch((error: ErrorType) => {
        // We can safely ignore the error if the request has been cancelled
        // since this means we are either about to unmount the component or
        // refetch the query with fresh data
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
