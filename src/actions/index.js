import api from "../api";

export function fetchTeams(params) {
  return (dispatch) => api.fetch('/teams', params)
    .then((response) => {
      dispatch({ type: 'FETCH_TEAMS_SUCCESS', response });
    });
}
