import { FETCH_TEAMS_SUCCESS } from '../types';

const initialState = {
  teams: [],
  loading: true
}

export default function (state = initialState, action) {
  if (action.type.match(/_REQUEST$/)) return { ...state, loading: true }

  switch (action.type) {
    case FETCH_TEAMS_SUCCESS:
      return {
        ...state,
        loading: false,
        teams: action.response.teams
      };
    default:
      return state;
  }
}
