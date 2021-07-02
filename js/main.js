import {createTemporalData} from './utils/get-temporal-data.js';
import {createNewDomElement} from './utils/create-new-dom-elemnts.js';
import './utils/set-processing-logic.js';

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
offerArray.forEach((element)=> {
  const icon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const marker = L.marker({
    lat: element.location.lat,
    lng: element.location.lng,
  },
  {
    icon,
    draggable: true,
  });
  marker
    .bindPopup(createNewDomElement(element))
    .addTo(map);
});
