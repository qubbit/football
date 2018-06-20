import { FETCH_COMPETITIONS_REQUEST, FETCH_COMPETITIONS_SUCCESS } from "../actions/types";
import { determineCurrentSeason } from "../utils";

const initialState = {
  competitions: [],
  currentSeason: determineCurrentSeason(),
  loading: true
};

function setColor(colorString) {
  return colorString.split(",").map(c => parseInt(c.trim(), 10)).slice(1,4);
}

function setFeId(competitions) {
  return competitions
    .filter(x => x.id !== 0 && x.isPopular)
    .map(c => ({...c, fe_id: c.uri.split("/")[1]}))
    .map(c => ({...c, color: setColor(c.primaryColor)}));
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMPETITIONS_REQUEST:
      return { ...state, loading: true };
    case FETCH_COMPETITIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        competitions: setFeId(action.response)
      };
    default:
      return state;
  }
}
