import {createFetch} from './toFetchData.js';
import {createMarker, MARKER_GROUP} from './marker.js';

const placeFormElement = document.querySelector('.ad-form');

const formFilterHandler = (event) => {
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
  event.currentTarget.removeEventListener(event.type, formFilterHandler);
  event.currentTarget.addEventListener(event.type, formFilterHandler);
};

const resetFormElementHandler =(event)=> {
  placeFormElement.reset();
  event.currentTarget.removeEventListener(event.type, resetFormElementHandler);
  event.currentTarget.addEventListener(event.type, resetFormElementHandler);
};


export  { formFilterHandler, resetFormElementHandler, placeFormElement };
