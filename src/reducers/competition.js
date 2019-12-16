import {
  FETCH_COMPETITION_REQUEST,
  FETCH_COMPETITION_SUCCESS
} from '../actions/types';
import { normalizeCompetition } from '../utils';

const initialState = {
  competition: null,
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMPETITION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_COMPETITION_SUCCESS:
      return {
        competition: {
          ...normalizeCompetition(action.response)
        },
        loading: false
      };
    default:
      return state;
  }
}
