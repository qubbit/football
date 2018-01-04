import { combineReducers } from 'redux';
import seasons from './seasons';
import teams from './teams';

export default combineReducers({
  seasons,
  teams
});
