import { setMarkers, removeMarkers } from './map.js';
import { debounce } from './utils.js';

const mapFilters = document.querySelector('.map__filters');

const setFilters = (amount, delay) => {
  mapFilters.addEventListener('change', debounce(() => {
    removeMarkers();
    setMarkers(amount);
  }, delay));
};

const filterByType = (offer) => {
  const selectedType = document.querySelector('#housing-type').value;

  if (offer.offer.type === selectedType || selectedType === 'any') {
    return true;
  }
  return false;
};

const filterByPrice = (offer) => {
  const selectedPrice = document.querySelector('#housing-price').value;

  if (selectedPrice === 'any') {
    return true;
  } else if (selectedPrice === 'middle' && offer.offer.price >= 10000 && offer.offer.price <= 50000) {
    return true;
  } else if (selectedPrice === 'low' && offer.offer.price >= 0 && offer.offer.price < 10000) {
    return true;
  } else if (selectedPrice === 'high' && offer.offer.price > 50000) {
    return true;
  }
  return false;
};

const filterByRooms = (offer) => {
  const selectedRooms = document.querySelector('#housing-rooms').value;

  if (selectedRooms === 'any' || selectedRooms === String(offer.offer.rooms)) {
    return true;
  }
  return false;
};

const filterByGuests = (offer) => {
  const selectedGuests = document.querySelector('#housing-guests').value;

  if (selectedGuests === 'any' || selectedGuests === String(offer.offer.guests)) {
    return true;
  }
  return false;
};

const filterByFeatures = (offer) => {
  const selectedFeatures = document.querySelectorAll('.map__checkbox:checked');
  const selectedValues = [];
  selectedFeatures.forEach((element) => selectedValues.push(element.value));

  const checkEntry = () => selectedValues.every((element) => offer.offer.features.includes(element));

  if (selectedFeatures.length === 0) {
    return true;
  } else if (offer.offer.features !== undefined && checkEntry()) {
    return true;
  }
  return false;
};

const filterOffers = (offers) =>
  offers.filter((offer) =>
    filterByType(offer) && filterByPrice(offer) &&
    filterByRooms(offer) && filterByGuests(offer) && filterByFeatures(offer));

const resetFilters = () => mapFilters.reset();

export {
  filterOffers,
  resetFilters,
  setFilters
};
