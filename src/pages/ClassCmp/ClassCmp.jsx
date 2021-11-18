import { PureComponent } from 'react';
import axios from 'axios';

import { List } from './components';

class ClassCmp extends PureComponent {
  state = {
    list: [],
    requestStatus: { error: null, isLoading: false, success: null },
    search: '',
    submitSearch: ''
  };

  onSearchChange = async (event) => {
    this.setState({ search: event.target.value });
  };

  onSearchSubmit = async () => {
    await this.setState((prevState) => ({
      ...prevState,
      requestStatus: { ...prevState.requestStatus, isLoading: true }
    }));

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

      this.setState((prevState) => ({
        ...prevState,
        requestStatus: {
          ...prevState.requestStatus,
          isLoading: false,
          success: true
        },
        list: response.data?.objects,
        submitSearch: search
      }));
    } catch (error) {
      this.setState((prevState) => ({
        ...prevState,
        requestStatus: { ...prevState.requestStatus, isLoading: false, error }
      }));
    }
  };

  render() {
    const {
      list,
      requestStatus: { isLoading },
      search,
      submitSearch
    } = this.state;

    return (
      <div className="Container">
        <div className="Controls">
          <label htmlFor="package">
            Package
            <input id="package" onChange={this.onSearchChange} value={search} />
          </label>
          <button onClick={this.onSearchSubmit} type="button">
            Search
          </button>
        </div>
        {list.length ? (
          <div className="List">
            <List isLoading={isLoading} list={list} search={submitSearch} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default ClassCmp;
