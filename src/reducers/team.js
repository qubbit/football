import { FETCH_TEAM_REQUEST, FETCH_TEAM_SUCCESS } from '../types';

const initialState = {
  team: {},
  loading: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_TEAM_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_TEAM_SUCCESS:
      return {
        ...state,
        loading: false,
        team: action.response,
      };
    default:
      return state;
  }
}
