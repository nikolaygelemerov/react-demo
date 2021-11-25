import { PureComponent } from 'react';
import axios from 'axios';

import { Icons } from '@components';

import { List } from './components';

class PlaygroundCmp extends PureComponent {
  state = {
    list: [],
    requestStatus: { error: null, isLoading: false, success: null },
    search: '',
    submitSearch: ''
  };

  onSearchChange = async (event) => {
    // Sets `search` state on every `onChange` event
    this.setState({ search: event.target.value });
  };

  onSearchSubmit = async (event) => {
    event.preventDefault();

    // Sets `isLoading`
    await this.setState((prevState) => ({
      ...prevState,
      requestStatus: { ...prevState.requestStatus, isLoading: true }
    }));

    // Continues after `isLoading` is true
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

      // Sets `list`, `submitSearch` and `requestStatus`
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
      // Sets `error` and `isLoading`
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
        <form className="Controls" onSubmit={this.onSearchSubmit}>
          <label htmlFor="package">
            Package
            <input id="package" onChange={this.onSearchChange} value={search} />
          </label>
          <button type="submit">Search</button>
        </form>
        <div className="List">
          {/* Mounts only when `list` has length */}
          {list.length ? (
            <List isLoading={isLoading} list={list} search={submitSearch} />
          ) : isLoading ? (
            <Icons.Loader />
          ) : (
            <h3>No result</h3>
          )}
        </div>
      </div>
    );
  }
}

export default PlaygroundCmp;
