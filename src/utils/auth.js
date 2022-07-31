import  baseUrl  from './urlConst';
const authURL = new URL('auth/', baseUrl );

const forgotPasswordURL = new URL('password-reset/', baseUrl );
const resetPasswordURL = new URL('reset', forgotPasswordURL );

const checkReponse = (response) => {
  (response) => {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }
}

export const forgotPassword = (email) => {
  return fetch(forgotPasswordURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then(checkReponse(response));
};

export const resetPassword = (password, code) => {
  return fetch(resetPasswordURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: password,
      token: code,
    }),
  }).then(checkReponse(response));
};