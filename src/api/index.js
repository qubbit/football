const API_URL = 'https://football.gopal.io/api';

function headers() {
  return {
    Accept: 'application/json'
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
      headers: headers()
    }).then(parseResponse);
  },

  async fetch2(url, params = {}) {
    try {
      const response = await fetch(`${API_URL}${url}${queryString(params)}`, {
        method: 'GET',
        headers: headers()
      });
      return await response.json();
    } catch (error) {
      console.log('[api/index.js]', error);
    }
  }
};
