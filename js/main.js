import {createTemporalData} from './utils/get-temporal-data.js';
import {createNewDomElement} from './utils/create-new-dom-elemnts.js';
import './utils/set-processing-logic.js';
import {createFetch, sendForm} from './utils/toFetchData.js';


const offerArray = createTemporalData();
const dataArray = [];
offerArray.forEach((value) => dataArray.push(createNewDomElement(value)));
const mapAddress = document.querySelector('#address');
const mainForm = document.querySelector('.ad-form');
const toggleDisabled = (tagName, boolean) => mainForm.querySelectorAll(tagName).forEach((element) => element.disabled = boolean);
mainForm.classList.add('ad-form--disabled');
toggleDisabled('input', true);
toggleDisabled('select', true);
toggleDisabled('textarea', true);
toggleDisabled('checkbox', true);

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
  .on('load', () => {
    mainForm.classList.remove('ad-form--disabled');
    toggleDisabled('input', false);
    toggleDisabled('select', false);
    toggleDisabled('textarea', false);
    toggleDisabled('checkbox', false);
  })
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
mapAddress.value = '35.6585 139.7454';
mainPinMarker.on('dragend', (event) => mapAddress.value = `${event.target._latlng.lat.toFixed(4)} ${event.target._latlng.lng.toFixed(4)}`);
mainPinMarker.addTo(map);

const markerGroup = L.layerGroup().addTo(map);

function  createMarker(element){
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
    .addTo(markerGroup)
    .bindPopup(createNewDomElement(element), {keepToView: true});

}

createFetch(
  (place) => place.forEach((element) => {
    createMarker(element);
  }),

  (err) => document.body.innerHTML += `<div class="error">
                    <p class="error__message">${err.message}</p>
                    <button type="button" class="error__button" onclick="document.querySelector('.error').style.display='none'">Попробовать снова</button>
                </div>`);


const placeForm = document.querySelector('.ad-form');

const hasType = document.querySelector('#housing-type');
hasType.addEventListener('change', (event) => {
  const value = event.target.value;
  createFetch(
    (place) => {
      markerGroup.clearLayers();
      place.forEach((element) => {
        if (element.offer.type === value || value === 'any') {
          if(element.offer.price ===value || value === 'any'){
            createMarker(element);
          }
        }
      });
    },

    (err) => document.body.innerHTML += `<div class="error">
                    <p class="error__message">${err.message}</p>
                    <button type="button" class="error__button" onclick="document.querySelector('.error').style.display='none'">Попробовать снова</button>
                </div>`);
});
placeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  sendForm(
    () => {
      mainPinMarker.setLatLng({
        lat: 35.658581,
        lng: 139.745438,
      }).update();
      document.body.innerHTML += `<div class="success" onclick="document.querySelector('.success').style.display='none'">
      <p class="success__message">Ваше объявление<br>успешно размещено!</p>
    </div>`;
      placeForm.reset();
    },
    () => document.body.innerHTML += `<div class="error">
      <p class="error__message">Ошибка размещения объявления</p>
      <button type="button" class="error__button" onclick="document.querySelector('.error').style.display='none'">Попробовать снова</button>
    </div>`,
    new FormData(event.target));
});
const resetForm = document.querySelector('.ad-form__reset');
resetForm.addEventListener('click', () => placeForm.reset());
