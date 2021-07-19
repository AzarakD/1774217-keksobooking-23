import { sendData } from './api.js';
import { centerMainMarker, setMarkers } from './map.js';
import { showSuccessMessage, showErrorMessage } from './modals.js';
import { resetFilters } from './filter.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const MAX_ROOMS = '100';
const MIN_CAPACITY = '0';
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_PREVIEW = 'img/muffin-grey.svg';

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
const resetButton = adForm.querySelector('.ad-form__reset');
const mapForm = document.querySelector('.map__filters');
const mapFilters = mapForm.querySelectorAll('select, fieldset');
const avatarInput = adForm.querySelector('#avatar');
const avatarPreview = adForm.querySelector('ad-form-header__preview, img');
const photoInput = adForm.querySelector('#images');
const photoDiv = adForm.querySelector('.ad-form__photo');

photoDiv.insertAdjacentHTML('afterbegin', '<img src="" alt="Фото жилья" width="70" height="70">');
const photoPreview = photoDiv.querySelector('img');
photoPreview.classList.add('hidden');

avatarInput.addEventListener('change', () => {
  const file = avatarInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((element) => fileName.endsWith(element));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

photoInput.addEventListener('change', () => {
  const file = photoInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((element) => fileName.endsWith(element));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      photoPreview.src = reader.result;
      photoPreview.classList.remove('hidden');
    });

    reader.readAsDataURL(file);
  }
});

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

const activateAdForm = () => {
  adForm.classList.remove('ad-form--disabled');

  adFieldsets.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

const activateFilterForm = () => {
  mapForm.classList.remove('map__filters--disabled');

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
  adForm.reset();
  resetFilters();
  centerMainMarker();
  avatarPreview.src = DEFAULT_PREVIEW;
  photoPreview.src = '';
  photoPreview.classList.add('hidden');
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
};

const resetAllForms = (offersAmount) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    setDefault();
    setMarkers(offersAmount);
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
  activateAdForm,
  activateFilterForm,
  setValidity,
  setFormSending,
  resetAllForms
};
