import { memo, useCallback, useReducer } from 'react';
import axios from 'axios';

import { Icons } from '@components';

import { List } from './components';
import { actionTypes, initialState, reducer } from './reducers';

const FuncCmp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = useCallback(async (event) => {
    dispatch({
      payload: event.target.value,
      type: actionTypes.SEARCH_SET
    });
  }, []);

  const onSearchSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      dispatch({ type: actionTypes.REQUEST_START });

      try {
        const response = await axios.get(
          'https://registry.npmjs.org/-/v1/search',
          {
            params: {
              text: state.search
            }
          }
        );

        dispatch({
          payload: {
            data: response.data?.objects ?? [],
            searchSubmit: state.search
          },
          type: actionTypes.REQUEST_SUCCESS
        });
      } catch (error) {
        dispatch({
          payload: error.message,
          type: actionTypes.REQUEST_ERROR
        });
      }
    },
    [state.search]
  );

  return (
    <div className="Container">
      <form className="Controls" onSubmit={onSearchSubmit}>
        <label htmlFor="package">
          Package
          <input id="package" onChange={onChange} value={state.search} />
        </label>
        <button disabled={state.isLoading} type="submit">
          Search
        </button>
      </form>
      <div className="List">
        {state.data?.length ? (
          <List
            isLoading={state.isLoading}
            list={state.data}
            search={state.searchSubmit}
          />
        ) : state.isLoading ? (
          <Icons.Loader />
        ) : (
          <h3>No result</h3>
        )}
      </div>
    </div>
  );
};

export default memo(FuncCmp);
