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
    createMarker(element).slice(0,10);
  }),

  (err) => document.body.innerHTML += `<div class="error">
                    <p class="error__message">${err.message}</p>
                    <button type="button" class="error__button" onclick="document.querySelector('.error').style.display='none'">Попробовать снова</button>
                </div>`);


const placeForm = document.querySelector('.ad-form');

const formFilter = document.querySelector('.map__filters');
formFilter.addEventListener('change', () => {
  const filtersForm = document.forms.filters;
  const filtersFormData = new FormData(filtersForm);
  const houseType = filtersFormData.get('housing-type');
  const housePrice = filtersFormData.get('housing-price');
  const houseRoom = filtersFormData.get('housing-rooms');
  const houseGuests = filtersFormData.get('housing-guests');
  const featuresWifi = filtersFormData.get('features_wifi');
  const featuresDishwasher = filtersFormData.get('features_dishwasher');
  const featuresParking = filtersFormData.get('features_parking');
  const featuresWasher = filtersFormData.get('features_washer');
  const featuresElevator = filtersFormData.get('features_elevator');
  const featuresConditioner = filtersFormData.get('features_conditioner');

  createFetch(
    (place) => {
      markerGroup.clearLayers();
      const houseTypeElements = place.filter((x) => {
        switch(houseType){
          case 'any': return true;
          case 'bungalow': return true;
          case 'flat': return true;
          case 'hotel': return true;
          case 'house': return true;
          case 'palace': return true;
          default:
            return false;
        }
      });
      const housePriceElements = houseTypeElements.filter((x) => {
        switch(housePrice){
          case 'any': return true;
          case 'middle' && (10000 <= housePrice.offer.price <= 50000): return true;
          case 'low' && (housePrice.offer.price<=10000): return true;
          case 'high' && (housePrice.offer.price>=50000): return true;
          default:
            return false;
        }
      });
      const houseRoomElements = housePriceElements.filter((x)=> {
        switch(houseRoom){
          case 'any': return true;
          case '1' : return true;
          case '2' : return true;
          case '3' : return true;
          default:
            return false;
        }
      });
      const houseGuestsElements = houseRoomElements.filter((x)=>{
        switch(houseGuests){
          case 'any': return true;
          case '0' : return true;
          case '1' : return true;
          case '2' : return true;
          default:
            return false;
        }
      });
      const featuresWifiElement = houseGuestsElements.filter((x)=> featuresWifi);
      const featuresDishwasherElement = featuresWifiElement.filter((x)=> featuresDishwasher);
      const featuresParkingElement = featuresDishwasherElement.filter((x)=> featuresParking);
      const featuresWasherElement = featuresParkingElement.filter((x)=> featuresWasher);
      const featuresElevatorElement = featuresWasherElement.filter((x)=> featuresElevator);
      const featuresConditionerElement = featuresElevatorElement.filter((x)=> featuresConditioner);


      const houseRoomsElements = featuresConditionerElement.filter((x) => {
        houseRoomsElements.forEach((element) => {
          createMarker(element);
        });
      });

    });
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
