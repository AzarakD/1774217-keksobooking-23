const getRandomInteger = (min, max) => {
  if (min >= 0 && max >= min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return 'Задан неверный диапазон.';
};

const getRandomFloat = (min, max, signs) => {
  if (min >= 0 && max >= min) {
    const divider = Math.pow(10, signs);
    return Math.floor((Math.random() * (max - min + (1 / divider)) + min) * divider) / divider;
  }

  return 'Задан неверный диапазон.';
};

const getRandomUniqElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  const randomElement = array[randomIndex];
  array.splice(randomIndex, 1);
  return randomElement;
};

const getRandomElement = (array) => array[getRandomInteger(0, array.length - 1)];

const getRandomArray = (array) => {
  const tempArray = array.slice();
  let newArray = new Array(getRandomInteger(0, array.length)).fill('');
  newArray = newArray.map(() => getRandomUniqElement(tempArray));
  return newArray;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.color = 'white';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

export {
  getRandomInteger,
  getRandomFloat,
  getRandomUniqElement,
  getRandomElement,
  getRandomArray,
  showAlert
};
