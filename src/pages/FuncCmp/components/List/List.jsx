import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

import { Icons } from '@components';

import { useMounted } from '../../hooks';

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

  // Start mutation observer:
  useEffect(() => {
    const mutationObserver = new MutationObserver(
      () => isMounted.current && forceRender({})
    );

    mutationObserver.observe(ref.current, MUTATION_OBSERVER_CONFIG);

    return () => {
      mutationObserver.disconnect();
    };
  }, [isMounted]);

  // Remove animation:
  useEffect(() => {
    if (ulClasses.includes('Glow')) {
      timeoutID.current && clearTimeout(timeoutID.current);

      timeoutID.current = setTimeout(() => {
        isMounted.current && setUlClasses(['Search']);
      }, ANIMATION_TIMEOUT);
    }
  }, [isMounted, ulClasses]);

  // Update entries:
  useEffect(() => {
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
  useEffect(() => {
    animate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchEntries]);

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
