import './utils/set-processing-logic.js';
import { initMap } from './utils/marker.js';
import { formFilterHandler, resetFormElementHandler } from './utils/filter.js';
import './utils/send-form.js';
import { getRequestData } from './utils/get-fetch-data.js';
import { backgroundChanging, imageChanging } from './utils/get-image-from-file.js';

const mapAddressElement = document.querySelector('#address');
const formFilterElement = document.querySelector('.map__filters');
const resetFormElement = document.querySelector('.ad-form__reset');

initMap(mapAddressElement);

getRequestData();

formFilterElement.addEventListener('change', formFilterHandler);

resetFormElement.addEventListener('click', resetFormElementHandler);
imageChanging('#avatar', '.ad-form-header__preview img');
backgroundChanging('#images', '.ad-form__photo');
