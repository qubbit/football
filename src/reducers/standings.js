import {
  FETCH_STANDINGS_REQUEST,
  FETCH_STANDINGS_SUCCESS
} from '../actions/types';

const initialState = {
  standings: [],
  matchDay: 0,
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_STANDINGS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_STANDINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        matchDay: action.response.matchday,
        standings: action.response.competitors
      };
    default:
      return state;
  }
}
