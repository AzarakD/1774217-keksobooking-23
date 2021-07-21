import { activateAdForm, activateFilterForm, deactivateForms } from './setup-form.js';
import { renderCard } from './popup-card.js';
import { getData } from './api.js';
import { filterOffers } from './filter.js';

const CITY_CENTER = {
  lat: 35.652832,
  lng: 139.839478,
};
const MAP_ZOOM = 10;

deactivateForms();

const setAddress = (element) => {
  const addressInput = document.querySelector('#address');
  const rowCoordinates = element.getLatLng();
  const lat = rowCoordinates.lat.toFixed(5);
  const lng = rowCoordinates.lng.toFixed(5);

  addressInput.value = `${lat}, ${lng}`;
};

const markerIcons = {
  main: L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  }),
  common: L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  }),
};

const map = L.map('map-canvas');

const mainMarker = L.marker(
  {
    lat: CITY_CENTER.lat,
    lng: CITY_CENTER.lng,
  },
  {
    draggable: true,
    icon: markerIcons.main,
  },
).addTo(map).on('moveend', () => setAddress(mainMarker));

const markersLayer = L.layerGroup().addTo(map);

const createMarker = (element, icon) => {
  L.marker(
    {
      lat: element.location.lat,
      lng: element.location.lng,
    },
    {
      draggable: false,
      icon: icon,
    },
  ).addTo(markersLayer).bindPopup(renderCard(element), {keepInView: true});
};

const removeMarkers = () => {
  markersLayer.clearLayers();
};

const setMarkers = (amount) => {
  removeMarkers();

  getData((offers) => {
    const filteredOffers = filterOffers(offers);

    filteredOffers.slice(0, amount).forEach((offer) => {
      createMarker(offer, markerIcons.common, map);
    });
    activateFilterForm();
  });
};

const centerMainMarker = () => {
  mainMarker.setLatLng(CITY_CENTER);
  map.setView(CITY_CENTER, MAP_ZOOM);
  setAddress(mainMarker);
};

const loadMap = (markerAmount) => {
  map.on('load', activateAdForm).setView({
    lat: CITY_CENTER.lat,
    lng: CITY_CENTER.lng,
  }, MAP_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  setMarkers(markerAmount);
  setAddress(mainMarker);
};

export {
  loadMap,
  setMarkers,
  centerMainMarker,
  removeMarkers
};
