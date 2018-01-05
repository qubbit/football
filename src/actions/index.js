import api from "../api";
import * as Types from '../types';

export function fetchFixtures(competitionId, params) {
  return (dispatch) => api.fetch(`/competitions/${competitionId}/fixtures`, params)
    .then((response) => {
      dispatch({ type: Types.FETCH_FIXTURES_SUCCESS, response });
    });
}

export function fetchCompetitions(params) {
  return (dispatch) => api.fetch('/competitions', params)
    .then((response) => {
      dispatch({ type: Types.FETCH_COMPETITIONS_SUCCESS, response });
    });
}

export function fetchTeams(competitionId, params) {
  return (dispatch) => api.fetch(`/competitions/${competitionId}/teams`, params)
    .then((response) => {
      dispatch({ type: Types.FETCH_TEAMS_SUCCESS, response });
    });
}
