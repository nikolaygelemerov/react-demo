import { createRef, Fragment, PureComponent } from 'react';

import { Icons } from '@components';

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

class List extends PureComponent {
  constructor(props) {
    super(props);

    const { list, search } = props;

    this.state = {
      // Default classes for `ul` element
      ulClasses: ['Search'],
      // Initial list of search entries
      searchEntries: [{ name: search, list }]
    };
  }

  timeoutID = null;

  ref = createRef(null);

  mutationOberver = new MutationObserver(() =>
    // On every mutation rerender
    this.setState((prevState) => ({ ...prevState }))
  );

  animate() {
    // Adds `Glow` class
    this.setState({ ulClasses: ['Search', 'Glow'] }, () => {
      this.timeoutID && clearTimeout(this.timeoutID);

      // Removes `Glow` class
      this.timeoutID = setTimeout(() => {
        this.setState({ ulClasses: ['Search'] });
      }, ANIMATION_TIMEOUT);
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { searchEntries } = prevState;

    // Builds a new `searchEntries` state based on `list` prop update
    if (!searchEntries.find((entry) => entry.name === nextProps.search)) {
      searchEntries = [
        { name: nextProps.search, list: nextProps.list },
        ...searchEntries
      ];
    }

    return {
      searchEntries
    };
  }

  render() {
    const { searchEntries, ulClasses } = this.state;
    const { isLoading, search } = this.props;

    // style object for Container to be transitioned
    const style = {
      height: this.ref.current?.offsetHeight ?? 0,
      overflow: 'hidden',
      transition: 'height 300ms ease-in-out'
    };

    return (
      <div style={style}>
        {/* Content div of transitioned Container */}
        <div ref={this.ref} className="UlContainer">
          {isLoading ? (
            <Icons.Loader />
          ) : (
            searchEntries.map(({ name, list }) => (
              <Fragment key={name}>
                <h3>{name}</h3>
                <ul
                  className={name === search ? ulClasses.join(' ') : 'Search'}
                >
                  {list.map((item) => (
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
  }

  componentDidMount() {
    // Sets `mutationOberver` listener
    this.mutationOberver.observe(this.ref.current, MUTATION_OBSERVER_CONFIG);

    // `componentDidMount` `componentDidUpdate` are render blocking
    // just like `useLayoutEffect`
    // blockRender();
    this.animate();
  }

  componentDidUpdate(prevProps) {
    const { search } = this.props;

    if (prevProps.search !== search) {
      this.animate();
    }
  }
}

export default List;
