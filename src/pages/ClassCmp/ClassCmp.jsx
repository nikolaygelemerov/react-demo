import { PureComponent } from 'react';
import axios from 'axios';

import { List } from './components';

import styles from './ClassCmp.scss';

class ClassCmp extends PureComponent {
  state = {
    list: [],
    search: '',
    submitSearch: ''
  };

  onSearchChange = async (event) => {
    this.setState({ search: event.target.value });
  };

  onSearchSubmit = async () => {
    try {
      const { search } = this.state;

      const response = await axios.get(
        'https://registry.npmjs.org/-/v1/search',
        {
          params: {
            text: search
          }
        }
      );

      this.setState({ list: response.data?.objects, submitSearch: search });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { list, search, submitSearch } = this.state;

    return (
      <div className={styles.Container}>
        <div className={styles.Controls}>
          <label htmlFor="package">
            Package
            <input id="package" onChange={this.onSearchChange} value={search} />
          </label>
          <button onClick={this.onSearchSubmit} type="button">
            Search
          </button>
        </div>
        {list.length ? (
          <div className={styles.List}>
            <List list={list} search={submitSearch} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default ClassCmp;
