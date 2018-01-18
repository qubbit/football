import { FETCH_TEAMS_REQUEST, FETCH_TEAMS_SUCCESS } from '../actions/types';

const initialState = {
  teams: [],
  loading: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_TEAMS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_TEAMS_SUCCESS:
      return {
        ...state,
        loading: false,
        teams: action.response.teams,
      };
    default:
      return state;
  }
}
