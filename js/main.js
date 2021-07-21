import { loadMap } from './map.js';
import { setValidity, setFormSending, resetAllForms } from './setup-form.js';
import { setFilters } from './filter.js';

const OFFER_AMOUNT = 10;

// Загрузка карты с метками
loadMap(OFFER_AMOUNT);

// Настройка валидации формы
setValidity();

// Настройка отправки формы
setFormSending();

// Настройка фильтррв
setFilters(OFFER_AMOUNT);

// Кнопка сброса
resetAllForms(OFFER_AMOUNT);
