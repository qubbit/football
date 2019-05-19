import api from '../api';
import * as TYPES from './types';

export function navigateToPage(page) {
  return dispatch => {
    dispatch({ type: TYPES.NAVIGATE_PAGE, page });
  };
}

export function fetchTodaysFixtures(customFixturesDate, params = {}) {
  return dispatch => {
    dispatch({ customFixturesDate, type: TYPES.FETCH_TODAYS_FIXTURES_REQUEST });
    return api.fetch(`/popular/events.json`, params).then(response => {
      dispatch({
        customFixturesDate,
        type: TYPES.FETCH_TODAYS_FIXTURES_SUCCESS,
        response,
        params
      });
    });
  };
}

export function setHomeFixtureCompetitionFilterId(
  homeFixtureCompetitionFilterId
) {
  return dispatch => {
    dispatch({
      homeFixtureCompetitionFilterId,
      type: TYPES.FILTER_HOME_FIXTURES_BY_COMPETITION
    });
  };
}

export function fetchFixtures(competitionId, params) {
  return dispatch => {
    dispatch({ type: TYPES.FETCH_FIXTURES_REQUEST });
    return api.fetch(`/${competitionId}/events.json`, params).then(response => {
      dispatch({ type: TYPES.FETCH_FIXTURES_SUCCESS, response, params });
    });
  };
}

export function fetchStandings(competitionId, params) {
  return dispatch => {
    dispatch({ type: TYPES.FETCH_STANDINGS_REQUEST });

    return api.fetch(`/${competitionId}/standings`, params).then(response => {
      dispatch({ type: TYPES.FETCH_STANDINGS_SUCCESS, response });
    });
  };
}

export function fetchCompetition(shortName, params) {
  return dispatch => {
    dispatch({ type: TYPES.FETCH_COMPETITION_REQUEST });

    return api.fetch(`/${shortName}.json`, params).then(response => {
      dispatch({ type: TYPES.FETCH_COMPETITION_SUCCESS, response });
    });
  };
}

export function fetchCompetitions(params) {
  return dispatch => {
    dispatch({ type: TYPES.FETCH_COMPETITIONS_REQUEST });

    return api.fetch('/', params).then(response => {
      dispatch({ type: TYPES.FETCH_COMPETITIONS_SUCCESS, response });
    });
  };
}

export function fetchTeams(uri, params) {
  return dispatch => {
    dispatch({ type: TYPES.FETCH_TEAMS_REQUEST });
    return api.fetch(`/${uri}/teams.json`, params).then(response => {
      dispatch({ type: TYPES.FETCH_TEAMS_SUCCESS, response });
    });
  };
}

export function fetchTeam(feId, teamId, params) {
  return dispatch => {
    dispatch({ type: TYPES.FETCH_TEAM_REQUEST });

    return api.fetch(`/${feId}/teams/${teamId}`, params).then(response => {
      dispatch({ type: TYPES.FETCH_TEAM_SUCCESS, response });
    });
  };
}

export function fetchPlayers(feId, teamId, params) {
  return dispatch => {
    dispatch({ type: TYPES.FETCH_PLAYERS_REQUEST });
    return api
      .fetch(`/${feId}/teams/${teamId}/athletes`, params)
      .then(response => {
        dispatch({ type: TYPES.FETCH_PLAYERS_SUCCESS, response });
      });
  };
}
