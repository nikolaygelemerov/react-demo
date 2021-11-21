export const actionTypes = {
  REQUEST_ERROR: 'REQUEST_ERROR',
  REQUEST_START: 'REQUEST_START',
  REQUEST_SUCCESS: 'REQUEST_SUCCESS',
  SEARCH_SET: 'SEARCH_SET'
};

export const initialState = {
  data: null,
  error: null,
  isLoading: false,
  search: '',
  searchSubmit: ''
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_ERROR:
      return {
        ...state,
        data: null,
        error: action.payload,
        isLoading: false
      };
    case actionTypes.REQUEST_START:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.REQUEST_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        error: null,
        isLoading: false,
        searchSubmit: action.payload.searchSubmit
      };
    case actionTypes.SEARCH_SET:
      return {
        ...state,
        search: action.payload
      };
    default:
      return state;
  }
};
