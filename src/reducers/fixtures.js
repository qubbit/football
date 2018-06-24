import {
  FETCH_FIXTURES_REQUEST,
  FETCH_FIXTURES_SUCCESS
} from '../actions/types';

const initialState = {
  fixtures: [],
  week: 1,
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_FIXTURES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_FIXTURES_SUCCESS:
      return {
        ...state,
        loading: false,
        week: action.params.week,
        fixtures: action.response.page
      };
    default:
      return state;
  }
}
