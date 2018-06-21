import { FETCH_COMPETITION_REQUEST, FETCH_COMPETITION_SUCCESS } from "../actions/types";

const initialState = {
  competition: {},
  loading: true
};

function setColor(colorString = "0,0,0,0") {
  return colorString.split(",").map(c => parseInt(c.trim(), 10)).slice(1,4);
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMPETITION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_COMPETITION_SUCCESS:
      return {
        competition: {...action.response, color: setColor(action.response.primaryColor), fe_id: action.response.uri.split("/")[1] },
        loading: false
      };
    default:
      return state;
  }
}
