const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MIN_PRICE = 0;
const MAX_PRICE = 1000000;
const MAX_ROOMS = '100';
const MIN_CAPACITY = '0';

const adForm = document.querySelector('.ad-form');
const adFieldsets = adForm.querySelectorAll('fieldset');
const titleInput = adForm.querySelector('#title');
const priceInput = adForm.querySelector('#price');
const roomsSelect = adForm.querySelector('#room_number');
const capacitySelect = adForm.querySelector('#capacity');

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

    if (priceValue < MIN_PRICE) {
      priceInput.setCustomValidity(`Минимальное значение ${ MIN_PRICE }`);
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

const setValidity = () => {
  setTitleValidity();
  setPriceValidity();
  setRoomsCapValidity();
};

export {
  deactivateForms,
  activateForms,
  setValidity
};
