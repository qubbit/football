import { combineReducers } from "redux";
import seasons from "./seasons";
import teams from "./teams";
import competitions from "./competitions";
import competition from "./competition";
import fixtures from "./fixtures";

// Global loading state can potentially added here
// instead of having one in each reducer
const appReducer = combineReducers({
  seasons,
  teams,
  fixtures,
  competition,
  competitions
});

export default function(state, action) {
  if (action.type === "LOGOUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
}
