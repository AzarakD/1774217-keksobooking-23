import { sendData } from './api.js';
import { centerMainMarker } from './map.js';
import { showSuccessMessage, showErrorMessage } from './modals.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const MAX_ROOMS = '100';
const MIN_CAPACITY = '0';

const MIN_PRICES = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};

const adForm = document.querySelector('.ad-form');
const adFieldsets = adForm.querySelectorAll('fieldset');
const titleInput = adForm.querySelector('#title');
const priceInput = adForm.querySelector('#price');
const roomsSelect = adForm.querySelector('#room_number');
const capacitySelect = adForm.querySelector('#capacity');
const housingTypeSelect = adForm.querySelector('#type');
const timeInSelect = adForm.querySelector('#timein');
const timeOutSelect = adForm.querySelector('#timeout');
const descriptionArea = adForm.querySelector('#description');
const features = adForm.querySelectorAll('.features__checkbox');
const resetButton = adForm.querySelector('.ad-form__reset');
const mapForm = document.querySelector('.map__filters');
const mapFilters = mapForm.querySelectorAll('select, fieldset');

const deactivateForms = () => {
  adForm.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');

  adFieldsets.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });

  mapFilters.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

const activateForms = () => {
  adForm.classList.remove('ad-form--disabled');
  mapForm.classList.remove('map__filters--disabled');

  adFieldsets.forEach((element) => {
    element.removeAttribute('disabled');
  });

  mapFilters.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

const setTitleValidity = () => {
  titleInput.addEventListener('input', () => {
    const valueLength = titleInput.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Ещё ${ MIN_TITLE_LENGTH - valueLength } симв.`);
    } else if (valueLength > MAX_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Лишние ${ valueLength - MAX_TITLE_LENGTH } смив.`);
    } else {
      titleInput.setCustomValidity('');
    }
    titleInput.reportValidity();
  });
};

const setPriceValidity = () => {
  priceInput.addEventListener('input', () => {
    const priceValue = Number(priceInput.value);
    const minPrice = Number(priceInput.min);

    if (priceValue < minPrice) {
      priceInput.setCustomValidity(`Минимальное значение ${ minPrice }`);
    } else if (priceValue > MAX_PRICE) {
      priceInput.setCustomValidity(`Максимальное значение ${ MAX_PRICE }`);
    } else {
      priceInput.setCustomValidity('');
    }
    priceInput.reportValidity();
  });
};

const setRoomsCapValidity = () => {
  const setCustomReport = () => {
    if (roomsSelect.value === MAX_ROOMS && capacitySelect.value !== MIN_CAPACITY) {
      roomsSelect.setCustomValidity('Это помещение не для гостей');
      capacitySelect.setCustomValidity('');
    } else if (capacitySelect.value === MIN_CAPACITY && roomsSelect.value !== MAX_ROOMS) {
      roomsSelect.setCustomValidity('');
      capacitySelect.setCustomValidity('Нужно выбрать не менее одного гостя');
    } else if (capacitySelect.value > roomsSelect.value) {
      roomsSelect.setCustomValidity('');
      capacitySelect.setCustomValidity('Число гостей не должно превышать число комнат');
    } else {
      roomsSelect.setCustomValidity('');
      capacitySelect.setCustomValidity('');
    }
    roomsSelect.reportValidity();
    capacitySelect.reportValidity();
  };

  roomsSelect.addEventListener('change', setCustomReport);
  capacitySelect.addEventListener('change', setCustomReport);
};

const setHousingType = () => {
  housingTypeSelect.addEventListener('change', (evt) => {
    priceInput.min = MIN_PRICES[evt.target.value];
    priceInput.placeholder = MIN_PRICES[evt.target.value];
  });
};

const setArrivalLeavingTime = () => {
  timeOutSelect.addEventListener('change', () => {
    timeInSelect.selectedIndex = timeOutSelect.selectedIndex;
  });

  timeInSelect.addEventListener('change', () => {
    timeOutSelect.selectedIndex = timeInSelect.selectedIndex;
  });
};

const setDefault = () => {
  centerMainMarker();

  titleInput.value = '';
  priceInput.value = '';
  housingTypeSelect.selectedIndex = 1;
  priceInput.min = '1000';
  priceInput.placeholder = '1000';
  roomsSelect.selectedIndex = 0;
  capacitySelect.selectedIndex = 2;
  descriptionArea.value = '';
  timeInSelect.selectedIndex = 0;
  timeOutSelect.selectedIndex = 0;

  features.forEach((element) => {
    element.checked = false;
  });
};

const setFormSending = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    sendData(() => {
      setDefault();
      showSuccessMessage();
    }, showErrorMessage, formData);
  });

  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    setDefault();
  });
};

const setValidity = () => {
  setTitleValidity();
  setPriceValidity();
  setRoomsCapValidity();
  setHousingType();
  setArrivalLeavingTime();
};

export {
  deactivateForms,
  activateForms,
  setValidity,
  setFormSending
};
