import './utils/set-processing-logic.js';
import { initMap} from './utils/marker.js';
import { formFilterHandler, resetFormElementHandler } from './utils/filter.js';
import './utils/send-form.js';
import './utils/get-fetch-data.js';

const mapAddressElement = document.querySelector('#address');
const formFilterElement = document.querySelector('.map__filters');
const resetFormElement = document.querySelector('.ad-form__reset');

initMap(mapAddressElement);

formFilterElement.addEventListener('change', formFilterHandler);

resetFormElement.addEventListener('click', resetFormElementHandler);
