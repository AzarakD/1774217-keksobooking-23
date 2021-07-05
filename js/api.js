import { showAlert } from './utils.js';

const URL = {
  data: 'https://23.javascript.pages.academy/keksobooking/data',
  server: 'https://23.javascript.pages.academy/keksobooking',
};

const getData = (onSuccess) => {
  fetch(URL.data)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((jsonData) => onSuccess(jsonData))
    .catch((error) => showAlert(`Не удалось получить данные. ${error}`));
};

const sendData = (onSuccess, onFail, body) => {
  fetch(URL.server, {method: 'POST', body})
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
