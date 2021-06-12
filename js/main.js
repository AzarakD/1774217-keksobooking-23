import { generateOffer } from './generate-offer.js';

const OFFERS = 10;

const generatedOffers = new Array(OFFERS).fill('').map(() => generateOffer());
generatedOffers;
