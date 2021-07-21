import { setMarkers, removeMarkers } from './map.js';
import { debounce } from './utils.js';

const TIMEOUT_DELAY = 500;

const selectedType = document.querySelector('#housing-type');
const selectedPrice = document.querySelector('#housing-price');
const selectedRooms = document.querySelector('#housing-rooms');
const selectedGuests = document.querySelector('#housing-guests');
const mapFilters = document.querySelector('.map__filters');

const setFilters = (amount) => {
  mapFilters.addEventListener('change', debounce(() => {
    removeMarkers();
    setMarkers(amount);
  }, TIMEOUT_DELAY));
};

const filterByType = (offer) => selectedType.value === 'any' || selectedType.value === offer.offer.type;

const filterByPrice = (offer) => selectedPrice.value === 'any' ||
  (selectedPrice.value === 'middle' && offer.offer.price >= 10000 && offer.offer.price <= 50000) ||
  (selectedPrice.value === 'low' && offer.offer.price >= 0 && offer.offer.price < 10000) ||
  (selectedPrice.value === 'high' && offer.offer.price > 50000);

const filterByRooms = (offer) => selectedRooms.value === 'any' || selectedRooms.value === String(offer.offer.rooms);

const filterByGuests = (offer) => selectedGuests.value === 'any' || selectedGuests.value === String(offer.offer.guests);

const filterByFeatures = (offer) => {
  const selectedFeatures = document.querySelectorAll('.map__checkbox:checked');
  const selectedValues = [];
  selectedFeatures.forEach((element) => selectedValues.push(element.value));

  const checkEntry = () => selectedValues.every((element) => offer.offer.features.includes(element));

  return ((selectedFeatures.length === 0) || (offer.offer.features !== undefined && checkEntry()));
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
