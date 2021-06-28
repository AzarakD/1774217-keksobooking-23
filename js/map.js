import { activateForms } from './setup-form.js';
import { generateOffer } from './generate-offer.js';
import { renderCard } from './popup-card.js';

const setMap = () => {
  const OFFERS = 10;
  const addressInput = document.querySelector('#address');

  const generatedOffers = new Array(OFFERS).fill('').map(generateOffer);
  const setAddress = (element) => {
    const rowCoordinates = element.getLatLng();
    const lat = rowCoordinates.lat.toFixed(5);
    const lng = rowCoordinates.lng.toFixed(5);

    addressInput.value = `${lat}, ${lng}`;
  };

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

  // --- Карта ---
  const map = L.map('map-canvas').on('load', activateForms);

  map.setView({
    lat: 35.652832,
    lng: 139.839478,
  }, 12);  // 10

  // --- Слой ---
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  // --- Метки ---
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

  const mainMarker = L.marker(
    {
      lat: 35.652832,
      lng: 139.839478,
    },
    {
      draggable: true,
      icon: markerIcons.main,
    },
  ).addTo(map);

  generatedOffers.forEach((offer) => {
    createMarker(offer, markerIcons.common, map);
  });

  setAddress(mainMarker);
  mainMarker.on('moveend', () => setAddress(mainMarker));
};

export { setMap };
