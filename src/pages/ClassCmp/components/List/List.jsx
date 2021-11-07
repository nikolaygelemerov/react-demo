import { PureComponent } from 'react';

class List extends PureComponent {
  render() {
    const { list } = this.props;

    return (
      <ul className="Search">
        {list.map((repo) => (
          <li key={repo?.package?.name} className="Search" onClick={() => {}}>
            {repo?.package?.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default List;
