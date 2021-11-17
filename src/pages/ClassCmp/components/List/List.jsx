import { PureComponent } from 'react';

class List extends PureComponent {
  constructor(props) {
    super(props);

    const { list, search } = props;

    this.state = {
      search,
      searchEntries: [{ [search]: list }]
    };
  }

  deletePackage({ entryName, pkgName }) {
    const { searchEntries } = this.state;

    const newEntries = [...searchEntries];

    const newEntry = newEntries
      .find((entry) => Object.keys(entry)[0] === entryName)
      .filter((item) => item?.package?.name === pkgName);

    if (newEntry.length) {
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { searchEntries } = prevState;

    if (!searchEntries.find((entry) => nextProps.search in entry)) {
      searchEntries = [
        { [nextProps.search]: nextProps.list },
        ...searchEntries
      ];
    }

    return {
      search: nextProps.search,
      searchEntries
    };
  }

  // eslint-disable-next-line react/sort-comp
  render() {
    const { searchEntries } = this.state;

    console.log('searchEntries: ', searchEntries);

    return (
      <div>
        {searchEntries.map((entry) => {
          const entryName = Object.keys(entry)[0];

          return (
            <>
              <h3>{entryName}</h3>
              <ul className="Search">
                {entry[entryName].map((item) => (
                  <li
                    key={item?.package?.name}
                    className="Search"
                    onClick={() => {
                      this.deletePackage({
                        entryName,
                        pkgName: item?.package?.name
                      });
                    }}
                  >
                    {item?.package?.name}
                  </li>
                ))}
              </ul>
            </>
          );
        })}
      </div>
    );
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('prevProps: ', prevProps);
    console.log('prevState: ', prevState);

    return null;
  }

  componentDidUpdate() {}
}

export default List;
