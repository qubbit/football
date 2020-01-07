import {
  FETCH_COMPETITIONS_REQUEST,
  FETCH_COMPETITIONS_SUCCESS
} from '../actions/types';
import { normalizeCompetitions, determineCurrentSeason } from '../utils';

const initialState = {
  competitions: [],
  currentSeason: determineCurrentSeason(),
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
        competitions: normalizeCompetitions(action.response)
      };
    default:
      return state;
  }
}
