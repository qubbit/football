// const API_URL = 'http://api.football-data.org/v1';

const API_URL = 'http://football.io/v1';
let TOKEN = 'super_secret';

if (process.env.NODE_ENV === 'development') {
  const {apiToken} = require('../config/secrets.json');
  TOKEN = apiToken;
}

function headers() {
  return {
    Accept: 'application/json',
    'X-Auth-Token': TOKEN,
  };
}

function parseResponse(response) {
  return response.json().then(json => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return json;
  });
}

function queryString(params) {
  const query = Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
  return `${query.length ? '?' : ''}${query}`;
}

export default {
  fetch(url, params = {}) {
    return fetch(`${API_URL}${url}${queryString(params)}`, {
      method: 'GET',
      headers: headers(),
    }).then(parseResponse);
  },
};
