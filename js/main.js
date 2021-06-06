const getRandomInteger = (min, max) => {
  if (min >= 0 && max >= 0 && min < max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return 'Задан неверный диапазон. Минимум должен быть меньше максимума, оба числа больше ноля';
};

const getRandomFloat = (min, max, signs) => {
  if (min >= 0 && max >= 0 && min < max) {
    const divider = Math.pow(10, signs);
    return Math.floor((Math.random() * (max - min + (1 / divider)) + min) * divider) / divider;
  }

  return 'Задан неверный диапазон. Минимум должен быть меньше максимума, оба числа больше ноля';
};

getRandomInteger(0, 10);
getRandomFloat(1, 10, 2);
