import { generateOffer } from './generate-offer.js';

const OFFERS = 1;

const renderCard = (offerData) => {
  const template = document.querySelector('#card').content.querySelector('.popup');
  const card = template.cloneNode(true);

  const popupTitle = card.querySelector('.popup__title');
  const popupAddress = card.querySelector('.popup__text--address');
  const popupPrice = card.querySelector('.popup__text--price');
  const popupType = card.querySelector('.popup__type');
  const popupCapacity = card.querySelector('.popup__text--capacity');
  const popupTime = card.querySelector('.popup__text--time');
  const popupFeatures = card.querySelector('.popup__features');
  const popupDescription = card.querySelector('.popup__description');
  const popupPhotos = card.querySelector('.popup__photos');
  const popupAvatar = card.querySelector('.popup__avatar');

  const imgTemplate = popupPhotos.children[0].cloneNode(true);
  const photoesFragment = document.createDocumentFragment();
  const featuresFragment = document.createDocumentFragment();

  popupTitle.textContent = offerData.offer.title;
  popupAddress.textContent = offerData.offer.address;
  popupPrice.innerHTML = `${offerData.offer.price} <span>₽/ночь</span>`;
  popupCapacity.textContent = `${offerData.offer.rooms} комнаты для ${offerData.offer.guests} гостей`;
  popupTime.textContent = `Заезд после ${offerData.offer.checkin}, выезд до ${offerData.offer.checkout}`;
  popupDescription.textContent = offerData.offer.description;
  popupAvatar.src = offerData.author.avatar;

  const getLivingType = (type) => {
    switch(type) {
      case 'palace' : return 'Дворец';
      case 'flat' : return 'Квартира';
      case 'house' : return 'Дом';
      case 'bungalow' : return 'Бунгало';
      case 'hotel' : return 'Отель';
    }
  };

  popupType.textContent = getLivingType(offerData.offer.type);

  offerData.offer.features.forEach((feature) => {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature', `popup__feature--${feature}`);
    featuresFragment.appendChild(featureElement);
  });

  popupFeatures.replaceWith(featuresFragment);

  offerData.offer.photos.forEach((photo) => {
    const photoElement = imgTemplate.cloneNode(true);
    photoElement.src = photo;
    photoesFragment.appendChild(photoElement);
  });

  popupPhotos.replaceWith(photoesFragment);

  if (offerData.offer.title.length === 0) {popupTitle.classList.add('hidden');}
  if (offerData.offer.address.length === 0) {popupAddress.classList.add('hidden');}
  if (offerData.offer.price.length === 0) {popupPrice.classList.add('hidden');}
  if (offerData.offer.type.length === 0) {popupType.classList.add('hidden');}
  if (offerData.offer.rooms.length === 0 || offerData.offer.guests.length === 0) {popupCapacity.classList.add('hidden');}
  if (offerData.offer.checkin.length === 0 || offerData.offer.checkout.length === 0) {popupTime.classList.add('hidden');}
  if (offerData.offer.features.length === 0) {popupFeatures.classList.add('hidden');}
  if (offerData.offer.description.length === 0) {popupDescription.classList.add('hidden');}
  if (offerData.offer.photos.length === 0) {popupPhotos.classList.add('hidden');}
  if (offerData.author.avatar.length === 0) {popupAvatar.classList.add('hidden');}

  return card;
};

const placeOfferOnMap = () => {
  const generatedOffers = new Array(OFFERS).fill('').map(generateOffer);
  const cards = new Array(OFFERS).fill('');
  const cardsFragment = document.createDocumentFragment();

  for (let offer = 0; offer < OFFERS; offer++) {
    cards[offer] = renderCard(generatedOffers[offer]);
    cardsFragment.appendChild(cards[offer]);
  }

  const mapCanvas = document.querySelector('#map-canvas');
  mapCanvas.appendChild(cardsFragment);
};

export { placeOfferOnMap };
