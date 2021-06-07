const NUMS_FOR_IMAGE_URL = ['01', '02', '03', '04', '05', '06', '07', '08'];

const CHARS_FOR_PHOTO_URL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const TITLES = [
  'Петровский Арт Лофт',
  'Agent Flat',
  'Гранд',
  'Avenue-Apart',
  'ReStop Loft Apart',
  'Greenfeel',
  'Smart Apart Africa',
  'Lifehack Apart',
];

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const CHECKINS = ['12:00', '13:00', '14:00'];

const CHECKOUTS = ['12:00', '13:00', '14:00'];

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const DESCRIPTIONS = [
  'Все номера оснащены телевизором с плоским экраном и спутниковыми каналами.',
  'Все апартаменты оснащены телевизором с плоским экраном, микроволновой печью, холодильником и чайником.',
  'Парам особенно нравится расположение — они оценили проживание в этом районе.',
  'Гости могут готовить на полностью оборудованной мини-кухне.',
  'Во всех номерах есть мини-кухня, телевизор с плоским экраном и кабельными каналами.',
  'В числе удобств телевизор с кабельными каналами.',
  'В распоряжении гостей холодильник, плита и чайник.',
  'В распоряжении гостей апартаменты с гамаком, обеденной зоной, гостиным уголком.',
];

const MIN_PRICE = 2000;
const MAX_PRICE = 20000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 5;
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;
const LATITUDE = [35.65, 35.7];
const LONGITUDE = [139.7, 139.8];
const OFFERS = 8;

const getRandomInteger = (min, max) => {
  if (min >= 0 && max >= 0 && min <= max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return 'Задан неверный диапазон.';
};

const getRandomFloat = (min, max, signs) => {
  if (min >= 0 && max >= 0 && min <= max) {
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

const generateOffer = () => {
  // Пришлось создать эту переменную, чтобы address и location совпадали
  const geoLocation = [
    getRandomFloat(LATITUDE[0], LATITUDE[1], 5),
    getRandomFloat(LONGITUDE[0], LONGITUDE[1], 5),
  ];
  return {
    author: `img/avatars/user${getRandomUniqElement(NUMS_FOR_IMAGE_URL)}.png`,
    offer: {
      title: getRandomUniqElement(TITLES),
      address: `${geoLocation[0]}.x, ${geoLocation[1]}.y`,
      price: getRandomInteger(MIN_PRICE, MAX_PRICE),
      type: getRandomElement(TYPES),
      rooms: getRandomInteger(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomInteger(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomElement(CHECKINS),
      checkout: getRandomElement(CHECKOUTS),
      features: getRandomArray(FEATURES),
      description: getRandomUniqElement(DESCRIPTIONS),
      photos: getPhotoURL(CHARS_FOR_PHOTO_URL),
    },
    location: {
      lat: geoLocation[0],
      lng: geoLocation[1],
    },
  };
};

const generatedOffers = new Array(OFFERS).fill('').map(() => generateOffer());
generatedOffers;
