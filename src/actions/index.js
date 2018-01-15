import api from "../api";
import * as TYPES from "../types";

export function fetchFixtures(competitionId, params) {
  return dispatch => {
    dispatch({ type: TYPES.FETCH_FIXTURES_REQUEST });

    return api
      .fetch(`/competitions/${competitionId}/fixtures`, params)
      .then(response => {
        dispatch({ type: TYPES.FETCH_FIXTURES_SUCCESS, response });
      });
  };
}

export function fetchStandings(competitionId, params) {
  return dispatch => {
    dispatch({ type: TYPES.FETCH_STANDINGS_REQUEST });

    return api
      .fetch(`/competitions/${competitionId}/leagueTable`, params)
      .then(response => {
        dispatch({ type: TYPES.FETCH_STANDINGS_SUCCESS, response });
      });
  };
}

export function fetchCompetition(id, params) {
  return dispatch => {
    dispatch({ type: TYPES.FETCH_COMPETITION_REQUEST });

    return api.fetch(`/competitions/${id}`, params).then(response => {
      dispatch({ type: TYPES.FETCH_COMPETITION_SUCCESS, response });
    });
  };
}

export function fetchCompetitions(params) {
  return dispatch => {
    dispatch({ type: TYPES.FETCH_COMPETITIONS_REQUEST });

    return api.fetch("/competitions", params).then(response => {
      dispatch({ type: TYPES.FETCH_COMPETITIONS_SUCCESS, response });
    });
  };
}

export function fetchTeams(competitionId, params) {
  return dispatch => {
    dispatch({ type: TYPES.FETCH_TEAMS_REQUEST });

    return api
      .fetch(`/competitions/${competitionId}/teams`, params)
      .then(response => {
        dispatch({ type: TYPES.FETCH_TEAMS_SUCCESS, response });
      });
  };
}
