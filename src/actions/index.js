import api from "../api";

export function fetchFixtures(competitionId, params) {
  return (dispatch) => api.fetch(`/competitions/${competitionId}/fixtures`, params)
    .then((response) => {
      dispatch({ type: 'FETCH_FIXTURES_SUCCESS', response });
    });
}

export function fetchCompetitions(params) {
  return (dispatch) => api.fetch('/competitions', params)
    .then((response) => {
      dispatch({ type: 'FETCH_COMPETITIONS_SUCCESS', response });
    });
}

export function fetchTeams(params) {
  return (dispatch) => api.fetch('/teams', params)
    .then((response) => {
      dispatch({ type: 'FETCH_TEAMS_SUCCESS', response });
    });
}
