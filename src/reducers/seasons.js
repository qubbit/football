import * as TYPES from "../actions/types";

const initialState = {
  currentSeason: {},
  seasons: [],
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.FETCH_SEASON_REQUEST:
      return { ...state, loading: true };
    case TYPES.FETCH_SEASONS_REQUEST:
      return { ...state, loading: true };
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
