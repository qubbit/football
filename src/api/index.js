// hehe
const API_URL = atob('aHR0cHM6Ly9hcGkuZm94c3BvcnRzLmNvbS9zcG9ydHNkYXRhL3Yx');

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
    const p = { ...params, apikey: atob('akU3eUJKVlJOQXdkRGVzTWdUelRYVVVTeDFJdDQxRnE=') };

    return fetch(`${API_URL}${url}${queryString(p)}`, {
      method: 'GET',
      headers: headers()
    }).then(parseResponse);
  }
};
