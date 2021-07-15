import {createTemporalData} from './utils/get-temporal-data.js';
import {createNewDomElement} from './utils/create-new-dom-elemnts.js';
import './utils/set-processing-logic.js';
import {createFetch, sendForm} from './utils/toFetchData.js';


const offerArray = createTemporalData();
const dataArray = [];
offerArray.forEach((value) => dataArray.push(createNewDomElement(value)));
const mapAddress = document.querySelector('#address');
let isLoadedMap = false;
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const mainPinMarker =
  L.marker({
    lat: 35.658581,
    lng: 139.745438,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  });

const map = L.map('map-canvas');
map
  // eslint-disable-next-line no-unused-vars
  .on('load', () => isLoadedMap = true)
  .setView({
    lat: 35.658581,
    lng: 139.745438,
  }, 12);
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);
mainPinMarker.addTo(map);

mainPinMarker.on('dragend', (event) => mapAddress.value = `${event.target._latlng.lat.toFixed(4)} ${event.target._latlng.lng.toFixed(4)}`);

createFetch(
  (place) => place.forEach((element) => {
    const icon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const marker = L.marker([
      element.location.lat,
      element.location.lng,
    ],
    {
      icon,
    });

    marker
      .addTo(map)
      .bindPopup(createNewDomElement(element), { keepToView: true });
  },
  ),
  (err) => document.body.innerHTML += `<div class="error">
                    <p class="error__message">${err.message}</p>
                    <button type="button" class="error__button" onclick="document.querySelector('.error').style.display='none'">Попробовать снова</button>
                </div>`);


const placeForm = document.querySelector('.ad-form');
placeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  sendForm(
    ()=> document.body.innerHTML+=`<div class="success" onclick="document.querySelector('.success').style.display='none'">
      <p class="success__message">Ваше объявление<br>успешно размещено!</p>
    </div>`,
    ()=> document.body.innerHTML+=`<div class="error">
      <p class="error__message">Ошибка размещения объявления</p>
      <button type="button" class="error__button" onclick="document.querySelector('.error').style.display='none'">Попробовать снова</button>
    </div>`,
    new FormData(event.target),
  );
  return placeForm.reset();
});
const resetForm = document.querySelector('.ad-form__reset');
resetForm.addEventListener('click',()=> placeForm.reset());
