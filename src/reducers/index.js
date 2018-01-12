import { combineReducers } from 'redux';
import seasons from './seasons';
import teams from './teams';
import competitions from './competitions';

// Global loading state can potentially added here
// instead of having one is each reducer
const appReducer = combineReducers({
  seasons,
  teams,
  competitions
});

export default function (state, action) {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
}
