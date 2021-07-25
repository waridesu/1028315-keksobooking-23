import {placeFormElement} from './filter.js';
import {sendForm} from './toFetchData.js';
import {MAIN_PIN_MARKER} from './marker.js';

const returnSuccessForm =()=> document.body.innerHTML += `<div class="success" onclick="document.querySelector('.success').style.display='none'">
      <p class="success__message">Ваше объявление<br>успешно размещено!</p>
    </div>`;
const returnFailForm =()=> document.body.innerHTML += `<div class="error">
      <p class="error__message">Ошибка размещения объявления</p>
      <button type="button" class="error__button" onclick="document.querySelector('.error').style.display='none'">Попробовать снова</button>
    </div>`;

placeFormElement.addEventListener('submit', (event) => {
  event.preventDefault();
  sendForm(
    () => {
      MAIN_PIN_MARKER.setLatLng({
        lat: 35.658581,
        lng: 139.745438,
      }).update();
      returnSuccessForm();
      placeFormElement.reset();
    },
    () => returnFailForm(),
    new FormData(event.target));
});
