import { FETCH_PLAYERS_REQUEST, FETCH_PLAYERS_SUCCESS } from '../actions/types';

const initialState = {
  players: {},
  loading: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PLAYERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_PLAYERS_SUCCESS:
      return {
        ...state,
        loading: false,
        players: action.response.page,
      };
    default:
      return state;
  }
}
