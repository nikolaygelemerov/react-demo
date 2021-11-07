import { PureComponent } from 'react';
import axios from 'axios';

import { List } from './components';

import styles from './ClassCmp.scss';

class ClassCmp extends PureComponent {
  state = {
    search: '',
    list: []
  };

  onChange = async (event) => {
    this.setState({ search: event.target.value });
  };

  onSearch = async () => {
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

      this.setState({ list: response.data?.objects });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { list } = this.state;

    console.log('list: ', list);

    return (
      <div className={styles.Container}>
        <div className={styles.Controls}>
          <input onChange={this.onChange} />
          <button onClick={this.onSearch} type="button">
            Search
          </button>
        </div>
        <div className={styles.List}>
          <List list={list} />
        </div>
      </div>
    );
  }
}

export default ClassCmp;
