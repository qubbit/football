import { FETCH_TEAMS_SUCCESS } from '../types';

const initialState = {
  teams: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_TEAMS_SUCCESS:
      return {
        ...state,
        teams: action.response.teams,
      };
    default:
      return state;
  }
}
