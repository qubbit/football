import moment from 'moment';
import {
  FETCH_FIXTURES_REQUEST,
  FETCH_FIXTURES_SUCCESS,
  FETCH_TODAYS_FIXTURES_REQUEST,
  FETCH_TODAYS_FIXTURES_SUCCESS,
  FILTER_HOME_FIXTURES_BY_COMPETITION
} from '../actions/types';

const initialState = {
  fixtures: [],
  week: 1,
  loading: true,
  todaysFixtures: [],
  date: moment().format('YYYYMMDD'),
  customFixturesDate: moment(),
  homeFixtureCompetitionFilterId: undefined
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FILTER_HOME_FIXTURES_BY_COMPETITION:
      return {
        ...state,
        homeFixtureCompetitionFilterId: action.homeFixtureCompetitionFilterId
      };
    case FETCH_FIXTURES_REQUEST:
    case FETCH_TODAYS_FIXTURES_REQUEST:
      return {
        ...state,
        customFixturesDate: action.customFixturesDate,
        loading: true
      };
    case FETCH_TODAYS_FIXTURES_SUCCESS:
      return {
        ...state,
        loading: false,
        customFixturesDate: action.customFixturesDate,
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
