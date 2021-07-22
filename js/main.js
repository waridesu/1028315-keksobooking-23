import {createNewDomElement} from './utils/create-new-dom-elemnts.js';
import './utils/set-processing-logic.js';
import {createFetch, sendForm} from './utils/toFetchData.js';
import {afterInit, onInit} from './utils/disable-on-init.js';

const mapAddress = document.querySelector('#address');

onInit();
const MAIN_PIN_ICON = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const MAIN_PIN_MARKER =
  L.marker({
    lat: 35.658581,
    lng: 139.745438,
  },
  {
    draggable: true,
    icon: MAIN_PIN_ICON,
  });

const MAP = L.map('map-canvas');
MAP
  .on('load', () => afterInit())
  .setView({
    lat: 35.658581,
    lng: 139.745438,
  }, 12);
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(MAP);
mapAddress.value = '35.6585 139.7454';
MAIN_PIN_MARKER.on('dragend', (event) => mapAddress.value = `${event.target._latlng.lat.toFixed(4)} ${event.target._latlng.lng.toFixed(4)}`);
MAIN_PIN_MARKER.addTo(MAP);

const MARKER_GROUP = L.layerGroup().addTo(MAP);

const createMarker = (element) => {
  const ICON = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const MARKER = L.marker([
    element.location.lat,
    element.location.lng,
  ],
  {
    icon: ICON,
  });
  MARKER
    .addTo(MARKER_GROUP)
    .bindPopup(createNewDomElement(element), {keepToView: true});
};

createFetch(
  (place) => place.slice(0, 10).forEach((element) => {
    createMarker(element);
  }),
  (err) => document.body.innerHTML += `<div class="error">
                    <p class="error__message">${err.message}</p>
                    <button type="button" class="error__button" onclick="document.querySelector('.error').style.display='none'">Попробовать снова</button>
                </div>`);


const placeForm = document.querySelector('.ad-form');

const formFilter = document.querySelector('.map__filters');
formFilter.addEventListener('change', () => {
  const filtersFormData = new FormData(document.forms.filters);
  const houseType = filtersFormData.get('housing-type');
  const housePrice = filtersFormData.get('housing-price');
  const houseRoom = filtersFormData.get('housing-rooms');
  const houseGuests = filtersFormData.get('housing-guests');
  const featuresWifi = filtersFormData.get('wifi');
  const featuresDishwasher = filtersFormData.get('dishwasher');
  const featuresParking = filtersFormData.get('parking');
  const featuresWasher = filtersFormData.get('washer');
  const featuresElevator = filtersFormData.get('elevator');
  const featuresConditioner = filtersFormData.get('conditioner');

  createFetch(
    (place) => {
      MARKER_GROUP.clearLayers();
      const houseTypeElements = place.filter((element) => {
        if (houseType === 'any') {
          return true;
        } else if (houseType === 'bungalow' && element.offer.type === 'bungalow') {
          return true;
        } else if (houseType === 'flat' && element.offer.type === 'flat') {
          return true;
        } else if (houseType === 'hotel' && element.offer.type === 'hotel') {
          return true;
        } else if (houseType === 'house' && element.offer.type === 'house') {
          return true;
        } else if (houseType === 'palace' && element.offer.type === 'palace') {
          return true;
        }
      });
      const housePriceElements = houseTypeElements.filter((element) => {
        if (housePrice === 'any') {
          return true;
        } else if (housePrice === 'low' && (element.offer.price <= 10000)) {
          return true;
        } else if (housePrice === 'high' && (element.offer.price >= 50000)) {
          return true;
        } else if (housePrice === 'middle' && (element.offer.price >= 10000 && element.offer.price <= 50000)) {
          return true;
        }
        return false;
      });
      const houseRoomElements = housePriceElements.filter((element) => {
        if (houseRoom === 'any') {
          return true;
        } else if (houseRoom === '1' && element.offer.rooms === 1) {
          return true;
        } else if (houseRoom === '2' && element.offer.rooms === 2) {
          return true;
        } else if (houseRoom === '3' && element.offer.rooms === 3) {
          return true;
        }
        return false;
      });
      const houseGuestsElements = houseRoomElements.filter((element) => {
        if (houseGuests === 'any') {
          return true;
        } else if (houseGuests === '0' && element.offer.guests === 0) {
          return true;
        } else if (houseGuests === '1' && element.offer.guests === 1) {
          return true;
        } else if (houseGuests === '2' && element.offer.guests === 2) {
          return true;
        }
        return false;
      });
      const featuresWifiElement = houseGuestsElements.filter((element) => (element.offer.features && element.offer.features.includes(featuresWifi)) || featuresWifi === null);
      const featuresDishwasherElement = featuresWifiElement.filter((element) => (element.offer.features && element.offer.features.includes(featuresDishwasher)) || featuresDishwasher === null);
      const featuresParkingElement = featuresDishwasherElement.filter((element) => (element.offer.features && element.offer.features.includes(featuresParking)) || featuresParking === null);
      const featuresWasherElement = featuresParkingElement.filter((element) => (element.offer.features && element.offer.features.includes(featuresWasher)) || featuresWasher === null);
      const featuresElevatorElement = featuresWasherElement.filter((element) => (element.offer.features && element.offer.features.includes(featuresElevator)) || featuresElevator === null);
      const featuresConditionerElement = featuresElevatorElement.filter((element) => (element.offer.features && element.offer.features.includes(featuresConditioner)) || featuresConditioner === null);

      featuresConditionerElement.slice(0, 10).forEach((element) => {
        createMarker(element);
      });

    });
});

placeForm.addEventListener('submit', (event) => {
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
