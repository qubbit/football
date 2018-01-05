import * as Types from '../types';

const initialState = {
  competitions: [],
  fixtures: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case Types.FETCH_COMPETITIONS_SUCCESS:
      return {
        ...state,
        competitions: action.response
      };
    case Types.FETCH_FIXTURES_SUCCESS:
      return {
        ...state,
        fixtures: action.response.fixtures
      };
    default:
      return state;
  }
}
