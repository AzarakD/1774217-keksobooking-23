const template = document.querySelector('#card').content.querySelector('.popup');

const renderCard = (offerData) => {
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

  const imgTemplate = popupPhotos.cloneNode(false);
  const featuresTemplate = popupFeatures.cloneNode(false);

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

  if (offerData.offer.features) {
    offerData.offer.features.forEach((feature) => {
      const featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', `popup__feature--${feature}`);
      featuresTemplate.appendChild(featureElement);
    });
  }
  popupFeatures.replaceWith(featuresTemplate);

  if (offerData.offer.photos) {
    offerData.offer.photos.forEach((photo) => {
      const photoElement = popupPhotos.children[0].cloneNode(false);
      photoElement.src = photo;
      imgTemplate.appendChild(photoElement);
    });
  }
  popupPhotos.replaceWith(imgTemplate);

  if (!offerData.offer.title) {popupTitle.classList.add('hidden');}
  if (!offerData.offer.address) {popupAddress.classList.add('hidden');}
  if (!offerData.offer.price) {popupPrice.classList.add('hidden');}
  if (!offerData.offer.type) {popupType.classList.add('hidden');}
  if (!offerData.offer.rooms || !offerData.offer.guests) {popupCapacity.classList.add('hidden');}
  if (!offerData.offer.checkin || !offerData.offer.checkout) {popupTime.classList.add('hidden');}
  if (!offerData.offer.features) {popupFeatures.classList.add('hidden');}
  if (!offerData.offer.description) {popupDescription.classList.add('hidden');}
  if (!offerData.offer.photos) {popupPhotos.classList.add('hidden');}
  if (!offerData.author.avatar) {popupAvatar.classList.add('hidden');}

  return card;
};

export { renderCard };
