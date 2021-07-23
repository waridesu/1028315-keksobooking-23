import {afterInitMap, beforeInitMap, mainForm} from './init-map.js';
import {createNewDomElement} from './create-new-dom-elemnts.js';

const MAP = L.map('map-canvas');
const MARKER_GROUP = L.layerGroup().addTo(MAP);
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

const initMap = (element) => {
  beforeInitMap(mainForm);

  MAP
    .on('load', () => afterInitMap(mainForm) )
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
  element.value = '35.6585 139.7454';
  MAIN_PIN_MARKER.on('dragend', (event) => element.value = `${event.target._latlng.lat.toFixed(4)} ${event.target._latlng.lng.toFixed(4)}`);
  MAIN_PIN_MARKER.addTo(MAP);
};

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

export  { initMap, MAIN_PIN_MARKER, MARKER_GROUP, MAP, createMarker };

