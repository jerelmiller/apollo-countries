import { useMemo, useRef } from 'react';
import isEqual from '@wry/equality';
import type { DependencyList } from 'react';

// This hook is useful to provide more natural interfaces for other hooks.
//
// For example, the `useQuery` hook takes an `options` argument which includes
// GraphQL variables. GraphQL `variables` are defined as objects in the request
// body to the GraphQL server. Its important to memoize the `variables` argument
// because it helps us to determine whether we need to rerun the GraphQL query
// when variables change. Rather than forcing the consumer of the hook to
// remember to memoize `variables`, we can provide a nicer API by allowing an
// object to be initialized each time.

const useDeepMemo = <T>(factory: () => T, deps: DependencyList) => {
  const ref = useRef(deps);

  if (!isEqual(ref.current, deps)) {
    ref.current = deps;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, ref.current);
};

export default useDeepMemo;
