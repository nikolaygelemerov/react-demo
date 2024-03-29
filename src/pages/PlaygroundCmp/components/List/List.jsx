import { createRef, Fragment, PureComponent } from 'react';

import { Icons } from '@components';

const ANIMATION_TIMEOUT = 3000; // ms

const MUTATION_OBSERVER_CONFIG = {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true
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

  isMounted = false;

  timeoutID = null;

  ref = createRef(null);

  observerCallback = () => this.forceUpdate();

  mutationObserver = new MutationObserver(this.observerCallback);

  animate() {
    // Adds `Glow` class
    this.isMounted && this.setState({ ulClasses: ['Search', 'Glow'] });
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
    this.isMounted = true;
    // Sets `mutationObserver` listener
    this.mutationObserver.observe(this.ref.current, MUTATION_OBSERVER_CONFIG);

    // Add animation:
    this.animate();
  }

  componentDidUpdate(prevProps, prevState) {
    const { ulClasses } = this.state;
    const { search } = this.props;

    // Add animation:
    if (prevProps.search !== search) {
      this.animate();
    }

    // Remove animation:
    if (prevState.ulClasses !== ulClasses && ulClasses.includes('Glow')) {
      this.timeoutID && clearTimeout(this.timeoutID);

      // Removes `Glow` class
      this.timeoutID = setTimeout(() => {
        this.isMounted && this.setState({ ulClasses: ['Search'] });
      }, ANIMATION_TIMEOUT);
    }
  }

  componentWillUnmount() {
    this.timeoutID && clearTimeout(this.timeoutID);
    this.mutationObserver && this.mutationObserver.disconnect();
    this.isMounted = false;
  }
}

export default List;
