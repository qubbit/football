const API_URL = 'http://api.football-data.org/v1';
const TOKEN = '78e9523b969e468e867b16260a01cf69';

function headers() {
  return {
    Accept: 'application/json',
    'X-Auth-Token': TOKEN
  };
}

function parseResponse(response) {
  return response.json().then((json) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return json;
  });
}

function queryString(params) {
  const query = Object.keys(params)
                      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
                      .join('&');
  return `${query.length ? '?' : ''}${query}`;
}

export default {
  fetch(url, params = {}) {
    return fetch(`${API_URL}${url}${queryString(params)}`, {
      method: 'GET',
      headers: headers(),
    })
    .then(parseResponse);
  }
}
