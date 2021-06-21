const adForm = document.querySelector('.ad-form');
const adFieldsets = adForm.children;
const mapForm = document.querySelector('.map__filters');
const mapFilters = mapForm.children;

const deactivatePage = () => {
  adForm.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');

  Array.from(adFieldsets).forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });

  Array.from(mapFilters).forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

const activatePage = () => {
  adForm.classList.remove('ad-form--disabled');
  mapForm.classList.remove('map__filters--disabled');

  Array.from(adFieldsets).forEach((element) => {
    element.removeAttribute('disabled');
  });

  Array.from(mapFilters).forEach((element) => {
    element.removeAttribute('disabled');
  });
};

export {
  activatePage,
  deactivatePage
};
