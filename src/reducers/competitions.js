import { FETCH_COMPETITIONS_REQUEST, FETCH_COMPETITIONS_SUCCESS } from "../actions/types";
// import { determineCurrentSeason } from "../utils";
import utils from "../utils";

const initialState = {
  competitions: [],
  currentSeason: utils(),
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMPETITIONS_REQUEST:
      return { ...state, loading: true };
    case FETCH_COMPETITIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        competitions: action.response
      };
    default:
      return state;
  }
}
