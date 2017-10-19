const callApi = (endpoint, body, method = 'GET') => {
  const apiUrl = 'localhost:3001';
  const urlScheme = apiUrl === 'localhost:3001' ? 'http://' : '';

  return fetch(`${urlScheme}${apiUrl}/${endpoint}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

export default callApi;
