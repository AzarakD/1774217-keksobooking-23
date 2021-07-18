import { loadMap, setMarkers } from './map.js';
import { setValidity, setFormSending, resetAllForms } from './setup-form.js';
import { setFilters } from './filter.js';

const OFFER_AMOUNT = 10;
const TIMEOUT_DELAY = 500;

// Загрузка карты
loadMap();

// Загрузка меток на карту
setMarkers(OFFER_AMOUNT);

// Настроить валидацию формы
setValidity();

// Настроить отправку формы
setFormSending();

// Настроить фильтры
setFilters(OFFER_AMOUNT, TIMEOUT_DELAY);

// Кнопка сброса
resetAllForms(OFFER_AMOUNT);
