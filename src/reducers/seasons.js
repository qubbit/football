import * as TYPES from '../types';

const initialState = {
  currentSeason: {},
  seasons: [],
  loading: true
}

export default function (state = initialState, action) {
  if (action.type.match(/_REQUEST$/)) return { ...state, loading: true }

  switch (action.type) {
    case TYPES.FETCH_SEASONS_SUCCESS:
      return {
        ...state,
        loading: false,
        seasons: action.response.data
      };
    case TYPES.FETCH_SEASON_SUCCESS:
      return {
        ...state,
        loading: false,
        currentSeason: action.response.data
      };
    default:
      return state;
  }
}
