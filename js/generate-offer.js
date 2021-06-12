import {
  getRandomInteger,
  getRandomFloat,
  getRandomUniqElement,
  getRandomElement,
  getRandomArray,
  getPhotoURL
} from './utils.js';

import {
  NUMS_FOR_IMAGE_URL,
  CHARS_FOR_PHOTO_URL,
  TITLES,
  TYPES,
  CHECKINS,
  CHECKOUTS,
  FEATURES,
  DESCRIPTIONS,
  MIN_PRICE,
  MAX_PRICE,
  MIN_ROOMS,
  MAX_ROOMS,
  MIN_GUESTS,
  MAX_GUESTS,
  LATITUDE,
  LONGITUDE
} from './data.js';

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

export { generateOffer };
