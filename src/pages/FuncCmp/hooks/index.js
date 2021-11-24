import { useEffect, useRef } from 'react';

export const useMounted = () => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};

export const useMount = (callback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, []);
};

export const useUpdatedRef = (value) => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
};

export const useUnmount = (callback) => {
  const updatedCallback = useUpdatedRef(callback);

  useEffect(
    () => () => {
      updatedCallback.current();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
};

export const useUpdate = (callback, deps = []) => {
  useEffect(() => {
    const result = callback();

    return async () => {
      const func = await result;

      if (typeof func === 'function') {
        func();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export const useUpdateOnly = (callback, deps = []) => {
  const mountRef = useRef(false);

  useEffect(() => {
    if (!mountRef.current) {
      mountRef.current = true;

      return;
    }

    const result = callback();

    return async () => {
      const func = await result;

      if (typeof func === 'function') {
        func();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export const useMutationObserver = ({ callback, config, target }) => {
  const observerRef = useRef(null);

  useUpdate(() => {
    if (target.current && observerRef.current === null) {
      observerRef.current = new MutationObserver(callback);
      observerRef.current.observe(target.current, config);
    }
  }, [target.current]);

  useUnmount(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
  });
};
