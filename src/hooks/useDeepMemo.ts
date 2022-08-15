import { useMemo, useRef } from 'react';
import isEqual from '@wry/equality';
import type { DependencyList } from 'react';

const useDeepMemo = <T>(factory: () => T, deps: DependencyList) => {
  const ref = useRef(deps);

  if (!isEqual(ref.current, deps)) {
    ref.current = deps;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, ref.current);
};

export default useDeepMemo;
