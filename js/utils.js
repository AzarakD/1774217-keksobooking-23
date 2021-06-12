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
  let newArray = new Array(getRandomInteger(1, array.length)).fill('');
  newArray = newArray.map(() => getRandomUniqElement(tempArray));
  return newArray;
};

const getPhotoURL = (chars) => {
  let newArray = new Array(getRandomInteger(1, 10)).fill('');
  newArray = newArray.map((value) => {
    value += 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/';
    for (let iter = 0; iter < 10; iter++) {
      value += getRandomElement(chars);
    }
    value += '.jpg';
    return value;
  });
  return newArray;
};

export {
  getRandomInteger,
  getRandomFloat,
  getRandomUniqElement,
  getRandomElement,
  getRandomArray,
  getPhotoURL
};
