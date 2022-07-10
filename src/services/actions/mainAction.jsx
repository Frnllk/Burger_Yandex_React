import { LOAD_INGREDIENTS, ORDER_NUMBER, ORDER_CLEAR } from './index';

const URL = 'https://norma.nomoreparties.space/api/ingredients';
const orderURL = 'https://norma.nomoreparties.space/api/orders';

export function getData() {
  return function (dispatch) {
    fetch(URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка ${response.status}`);
      })
      .then((response) => {
          dispatch({
            type: LOAD_INGREDIENTS,
            data: response.data,
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function postOrder(data) {
  return async function (dispatch) {
    const orders = data.map((item) => item._id);
    const answer = await fetch(orderURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        ingredients: orders,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка ${response.status}`);
      })
      .then((response) => {
          dispatch({
            type: ORDER_NUMBER,
            number: response.order.number,
          });
          dispatch({
            type: ORDER_CLEAR,
          });
      })
      .catch((error) => {
        console.log(error);
      });
    return answer;
  };
}