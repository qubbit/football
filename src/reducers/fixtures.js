import moment from 'moment';
import {
  FETCH_FIXTURES_REQUEST,
  FETCH_FIXTURES_SUCCESS
} from '../actions/types';

const initialState = {
  fixtures: [],
  matchDay: moment().format('YYYYMMDD'),
  week: 1,
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_FIXTURES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_FIXTURES_SUCCESS:
      return {
        ...state,
        loading: false,
        matchDay: action.params.matchday,
        fixtures: action.response.page
      };
    default:
      return state;
  }
}
