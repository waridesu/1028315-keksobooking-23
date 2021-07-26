import {createNewDomElement} from './create-new-dom-elemnts.js';

const MAP = L.map('map-canvas');
const MARKER_GROUP = L.layerGroup().addTo(MAP);
const MAIN_MARKER_INIT_POSITION = {
  lat: 35.658581,
  lng: 139.745438,
};
const MAIN_ICON_SIZE = [52, 52];
const MAIN_ICON_ANCHOR = [26, 52];
const MAP_CENTER = {
  lat: 35.658581,
  lng: 139.745438,
};
const GROUP_ICON_SIZE = [40, 40];
const GROUP_ICON_ANCHOR = [20, 40];
const MAIN_PIN_ICON = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: MAIN_ICON_SIZE,
  iconAnchor: MAIN_ICON_ANCHOR,
});
const MAIN_PIN_MARKER =
  L.marker(MAIN_MARKER_INIT_POSITION,
    {
      draggable: true,
      icon: MAIN_PIN_ICON,
    });

const initMap = async (element, onLoadData) => {
  MAP
    .on('load', () => onLoadData())
    .setView(MAP_CENTER, 12);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(MAP);
  element.value = `${MAIN_MARKER_INIT_POSITION.lat.toFixed(5)}, ${MAIN_MARKER_INIT_POSITION.lng.toFixed(5)}`;
  MAIN_PIN_MARKER.on('dragend', (event) => element.value = `${event.target._latlng.lat.toFixed(5)}, ${event.target._latlng.lng.toFixed(5)}`);
  MAIN_PIN_MARKER.addTo(MAP);
};

const createMarker = (element) => {
  const ICON = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: GROUP_ICON_SIZE,
    iconAnchor: GROUP_ICON_ANCHOR,
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

export {initMap, MAIN_PIN_MARKER, MARKER_GROUP, MAP, createMarker};

