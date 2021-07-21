import { activateAdForm, activateFilterForm, deactivateForms } from './setup-form.js';
import { renderCard } from './popup-card.js';
import { getData } from './api.js';
import { filterOffers } from './filter.js';

const CITY_CENTER = {
  lat: 35.652832,
  lng: 139.839478,
};

const MAIN_ICON_PARAMS = {
  url: 'img/main-pin.svg',
  size: [52, 52],
  anchor: [26, 52],
};

const COMMON_ICON_PARAMS = {
  url: 'img/pin.svg',
  size: [40, 40],
  anchor: [20, 40],
};

const ROUNDING = 5;
const MAP_ZOOM = 10;

deactivateForms();

const setAddress = (element) => {
  const addressInput = document.querySelector('#address');
  const rowCoordinates = element.getLatLng();
  const lat = rowCoordinates.lat.toFixed(ROUNDING);
  const lng = rowCoordinates.lng.toFixed(ROUNDING);

  addressInput.value = `${lat}, ${lng}`;
};

const markerIcons = {
  main: L.icon({
    iconUrl: MAIN_ICON_PARAMS.url,
    iconSize: MAIN_ICON_PARAMS.size,
    iconAnchor: MAIN_ICON_PARAMS.anchor,
  }),
  common: L.icon({
    iconUrl: COMMON_ICON_PARAMS.url,
    iconSize: COMMON_ICON_PARAMS.size,
    iconAnchor: COMMON_ICON_PARAMS.anchor,
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
  const onMapLoaded = () => {
    activateAdForm();
    setMarkers(markerAmount);
    setAddress(mainMarker);
  };

  map.on('load', onMapLoaded).setView({
    lat: CITY_CENTER.lat,
    lng: CITY_CENTER.lng,
  }, MAP_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

export {
  loadMap,
  setMarkers,
  centerMainMarker,
  removeMarkers
};
