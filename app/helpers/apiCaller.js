export const renewToken = (userId) => {
  callApi('renewToken', { userId }, 'POST')
    .then(res => res.json())
    .then(({ token }) => localStorage.setItem('token', token))
    .catch(err => console.log(err));
};

export const uploadFile = (file, signedRequest) =>
  fetch(signedRequest, {
    method: 'PUT',
    body: file
  });


const callApi = (endpoint, body, method = 'GET') => {
  const token = localStorage.getItem('token') || null;
  const apiUrl = 'localhost:3001';
  const urlScheme = apiUrl === 'localhost:3001' ? 'http://' : '';

  return fetch(`${urlScheme}${apiUrl}/${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body),
  });
};

export default callApi;
