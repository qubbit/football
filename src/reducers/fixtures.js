import moment from 'moment';
import {
  FETCH_FIXTURES_REQUEST,
  FETCH_FIXTURES_SUCCESS,
  FETCH_TODAYS_FIXTURES_REQUEST,
  FETCH_TODAYS_FIXTURES_SUCCESS
} from '../actions/types';

const initialState = {
  fixtures: [],
  week: 1,
  loading: true,
  todaysFixtures: [],
  date: moment().format('YYYYMMDD')
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_FIXTURES_REQUEST:
    case FETCH_TODAYS_FIXTURES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_TODAYS_FIXTURES_SUCCESS:
      return {
        ...state,
        loading: false,
        todaysFixtures: action.response.page
      };
    case FETCH_FIXTURES_SUCCESS:
      return {
        ...state,
        loading: false,
        week: action.params.week,
        date: action.params.date,
        fixtures: action.response.page
      };
    default:
      return state;
  }
}
