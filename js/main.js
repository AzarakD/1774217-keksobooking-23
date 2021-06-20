import { generateOffer } from './generate-offer.js';
import { generateCard } from './popup-card.js';

const OFFERS = 10;
const generatedOffers = new Array(OFFERS).fill('').map(() => generateOffer());
const generatedCards = new Array(OFFERS).fill('');
const cardsFragments = document.createDocumentFragment();

for (let offer = 0; offer < OFFERS; offer++) {
  generatedCards[offer] = generateCard(generatedOffers[offer]);
  cardsFragments.appendChild(generatedCards[offer]);
}

const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(cardsFragments.firstChild);
