import * as TYPES from "../types";
import { determineCurrentSeason } from "../utils";

const initialState = {
  competitions: [],
  currentCompetition: {},
  currentSeason: determineCurrentSeason(),
  fixtures: [],
  loading: true
};

export default function(state = initialState, action) {
  if (action.type.match(/_REQUEST$/)) return { ...state, loading: true };

  switch (action.type) {
    case TYPES.FETCH_COMPETITION_SUCCESS:
      return {
        ...state,
        loading: false,
        currentCompetition: action.response
      };
    case TYPES.FETCH_COMPETITIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        competitions: action.response
      };
    case TYPES.FETCH_FIXTURES_SUCCESS:
      return {
        ...state,
        loading: false,
        fixtures: action.response.fixtures
      };
    default:
      return state;
  }
}
