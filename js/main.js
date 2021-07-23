import './utils/set-processing-logic.js';
import {createFetch, sendForm} from './utils/toFetchData.js';
import { initMap, MAIN_PIN_MARKER, createMarker } from './utils/marker.js';
import { formFilterHandler } from './utils/filter.js';

const mapAddressElement = document.querySelector('#address');
const placeFormElement = document.querySelector('.ad-form');
const formFilterElement = document.querySelector('.map__filters');
const resetFormElement = document.querySelector('.ad-form__reset');

initMap(mapAddressElement);

createFetch(
  (place) => place.slice(0, 10).forEach((element) => {
    createMarker(element);
  }),

  (err) => document.body.innerHTML += `<div class="error">
                    <p class="error__message">${err.message}</p>
                    <button type="button" class="error__button" onclick="document.querySelector('.error').style.display='none'">Попробовать снова</button>
                </div>`);


formFilterElement.addEventListener('change', formFilterHandler);
placeFormElement.addEventListener('submit', (event) => {
  event.preventDefault();
  sendForm(
    () => {
      MAIN_PIN_MARKER.setLatLng({
        lat: 35.658581,
        lng: 139.745438,
      }).update();
      document.body.innerHTML += `<div class="success" onclick="document.querySelector('.success').style.display='none'">
      <p class="success__message">Ваше объявление<br>успешно размещено!</p>
    </div>`;
      placeFormElement.reset();
    },
    () => document.body.innerHTML += `<div class="error">
      <p class="error__message">Ошибка размещения объявления</p>
      <button type="button" class="error__button" onclick="document.querySelector('.error').style.display='none'">Попробовать снова</button>
    </div>`,
    new FormData(event.target));
});

resetFormElement.addEventListener('click', () => placeFormElement.reset());
