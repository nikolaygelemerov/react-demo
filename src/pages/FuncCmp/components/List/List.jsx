import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';

import { Icons } from '@components';

import {
  useMount,
  useMutationObserver,
  useMounted,
  useUnmount,
  useUpdate,
  useUpdateOnly
} from '../../hooks';

const ANIMATION_TIMEOUT = 3000; // ms

const MUTATION_OBSERVER_CONFIG = {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true
};

const blockRender = () => {
  const date = Date.now();

  while (date + 3000 > Date.now()) {}
};

const List = ({ isLoading, list, search }) => {
  const isMounted = useMounted();

  const [_, forceRender] = useState({});

  const [searchEntries, setSearchEntries] = useState([
    {
      list,
      name: search
    }
  ]);

  const [ulClasses, setUlClasses] = useState(['Search']);

  const timeoutID = useRef(null);

  const ref = useRef(null);

  const animate = useCallback(() => {
    setUlClasses(['Search', 'Glow']);
  }, []);

  const logSearchEntries = useCallback(() => {
    console.log('UNMOUNT searchEntries: ', searchEntries);
  }, [searchEntries]);

  useMutationObserver({
    callback: () => isMounted.current && forceRender({}),
    config: MUTATION_OBSERVER_CONFIG,
    target: ref
  });

  useMount(() => {
    console.log('MOUNT searchEntries: ', searchEntries);
  });

  // Remove animation:
  useUpdate(() => {
    if (ulClasses.includes('Glow')) {
      timeoutID.current && clearTimeout(timeoutID.current);

      timeoutID.current = setTimeout(() => {
        isMounted.current && setUlClasses(['Search']);
      }, ANIMATION_TIMEOUT);
    }
  }, [isMounted, ulClasses]);

  // Update entries:
  useUpdate(async () => {
    setSearchEntries((current) => {
      if (!current.find((entry) => entry.name === search)) {
        return [
          {
            list,
            name: search
          },
          ...current
        ];
      }
      return current;
    });
  }, [list, search]);

  // Animate new search entries:
  useUpdate(() => {
    animate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchEntries]);

  useUpdate(() => {
    console.log('UPDATE searchEntries: ', searchEntries);
  }, [searchEntries]);

  useUpdateOnly(() => {
    console.log('UPDATE_ONLY searchEntries: ', searchEntries);
  }, [searchEntries]);

  useUnmount(logSearchEntries);

  useLayoutEffect(() => {
    blockRender();
  }, []);

  return (
    <div
      style={{
        height: ref.current?.offsetHeight ?? 0,
        overflow: 'hidden',
        transition: 'height 300ms ease-in-out'
      }}
    >
      <div ref={ref} className="UlContainer">
        {isLoading ? (
          <Icons.Loader />
        ) : (
          searchEntries.map(({ name, list: packages }) => (
            <Fragment key={name}>
              <h3>{name}</h3>
              <ul className={name === search ? ulClasses.join(' ') : 'Search'}>
                {packages.map((item) => (
                  <li key={item?.package?.name} className="Search">
                    {item?.package?.name}
                  </li>
                ))}
              </ul>
            </Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default memo(List);
