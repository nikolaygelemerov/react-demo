import { Fragment, PureComponent } from 'react';

import { Icons } from '@components';

const ANIMATION_TIMEOUT = 3000; // ms

class List extends PureComponent {
  constructor(props) {
    super(props);

    const { list, search } = props;

    this.state = {
      ulClasses: ['Search'],
      searchEntries: [{ name: search, list }]
    };
  }

  timeoutID = null;

  animate() {
    this.setState({ ulClasses: ['Search', 'Glow'] }, () => {
      this.timeoutID && clearTimeout(this.timeoutID);

      this.timeoutID = setTimeout(() => {
        this.setState({ ulClasses: ['Search'] });
      }, ANIMATION_TIMEOUT);
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { searchEntries } = prevState;

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

    return isLoading ? (
      <Icons.Loader />
    ) : (
      searchEntries.map(({ name, list }) => (
        <Fragment key={name}>
          <h3>{name}</h3>
          <ul className={name === search ? ulClasses.join(' ') : 'Search'}>
            {list.map((item) => (
              <li key={item?.package?.name} className="Search">
                {item?.package?.name}
              </li>
            ))}
          </ul>
        </Fragment>
      ))
    );
  }

  componentDidMount() {
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
