import { activateForms } from './setup-form.js';
import { renderCard } from './popup-card.js';
import { getData } from './api.js';

const CITY_CENTER = {lat: 35.652832, lng: 139.839478};
const OFFER_AMOUNT = 10;
const MAP_ZOOM = 10;

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

const setAddress = (element) => {
  const addressInput = document.querySelector('#address');
  const rowCoordinates = element.getLatLng();
  const lat = rowCoordinates.lat.toFixed(5);
  const lng = rowCoordinates.lng.toFixed(5);

  addressInput.value = `${lat}, ${lng}`;
};


const map = L.map('map-canvas')
  .on('load', activateForms)
  .setView({
    lat: CITY_CENTER.lat,
    lng: CITY_CENTER.lng,
  }, MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMarker = L.marker(
  {
    lat: CITY_CENTER.lat,
    lng: CITY_CENTER.lng,
  },
  {
    draggable: true,
    icon: markerIcons.main,
  },
).addTo(map);

const createMarker = (element, icon, place) => {
  L.marker(
    {
      lat: element.location.lat,
      lng: element.location.lng,
    },
    {
      draggable: false,
      icon: icon,
    },
  ).addTo(place).bindPopup(renderCard(element), {keepInView: true});
};

const setMarkers = (amount, place) => {
  getData((offers) => {
    offers.slice(0, amount).forEach((offer) => {
      createMarker(offer, markerIcons.common, place);
    });
  });
};

const centerMainMarker = () => {
  mainMarker.setLatLng(CITY_CENTER);
  map.setView(CITY_CENTER, MAP_ZOOM);
  setAddress(mainMarker);
};

setMarkers(OFFER_AMOUNT, map);
setAddress(mainMarker);
mainMarker.on('moveend', () => setAddress(mainMarker));

export { centerMainMarker };

// import { activateForms } from './setup-form.js';
// import { renderCard } from './popup-card.js';
// import { getData } from './api.js';

// const CITY_CENTER = {lat: 35.652832, lng: 139.839478};
// const OFFER_AMOUNT = 10;

// const markerIcons = {
//   main: L.icon({
//     iconUrl: 'img/main-pin.svg',
//     iconSize: [52, 52],
//     iconAnchor: [26, 52],
//   }),
//   common: L.icon({
//     iconUrl: 'img/pin.svg',
//     iconSize: [40, 40],
//     iconAnchor: [20, 40],
//   }),
// };

// const setMap = () => {
//   const map = L.map('map-canvas')
//     .on('load', activateForms)
//     .setView({
//       lat: CITY_CENTER.lat,
//       lng: CITY_CENTER.lng,
//     }, 12);  // 10

//   return map;
// };

// const setLayer = (place) => {
//   L.tileLayer(
//     'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//     {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     },
//   ).addTo(place);
// };

// const setAddress = (element) => {
//   const addressInput = document.querySelector('#address');
//   const rowCoordinates = element.getLatLng();
//   const lat = rowCoordinates.lat.toFixed(5);
//   const lng = rowCoordinates.lng.toFixed(5);

//   addressInput.value = `${lat}, ${lng}`;
// };

// const createMainMarker = (icon, place) => {
//   const marker = L.marker(
//     {
//       lat: CITY_CENTER.lat,
//       lng: CITY_CENTER.lng,
//     },
//     {
//       draggable: true,
//       icon: icon,
//     },
//   ).addTo(place);

//   return marker;
// };

// const centerMainMarker = (marker) => {
//   marker.setLatLng(CITY_CENTER);
// };

// const createMarker = (element, icon, place) => {
//   L.marker(
//     {
//       lat: element.location.lat,
//       lng: element.location.lng,
//     },
//     {
//       draggable: false,
//       icon: icon,
//     },
//   ).addTo(place).bindPopup(renderCard(element), {keepInView: true});
// };

// const setMarkers = (amount, place) => {
//   getData((offers) => {
//     offers.slice(0, amount).forEach((offer) => {
//       createMarker(offer, markerIcons.common, place);
//     });
//   });
// };

// const loadMap = () => {
//   const map = setMap();
//   const mainMarker = createMainMarker(markerIcons.main, map);

//   setLayer(map);
//   setMarkers(OFFER_AMOUNT, map);
//   setAddress(mainMarker);
//   mainMarker.on('moveend', () => setAddress(mainMarker));
// };

// export { loadMap };
