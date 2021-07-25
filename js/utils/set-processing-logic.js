const MIN_PALACE_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const typeOfResidence = document.querySelector('#type');
window.onload = typeOfResidence.value === 'bungalow'? document.querySelector('#price').placeholder = MIN_PALACE_PRICE.bungalow:null;

const typeOfResidenceHandler = (event) => {
  const priceByNight = document.querySelector('#price');
  switch (event.target.value) {
    case 'bungalow':
      return priceByNight.placeholder = MIN_PALACE_PRICE.bungalow;
    case 'flat':
      return priceByNight.placeholder = MIN_PALACE_PRICE.flat;
    case 'hotel':
      return priceByNight.placeholder = MIN_PALACE_PRICE.hotel;
    case 'house':
      return priceByNight.placeholder = MIN_PALACE_PRICE.house;
    case 'palace':
      return priceByNight.placeholder = MIN_PALACE_PRICE.palace;
  }
  event.currentTarget.removeEventListener(event.type, typeOfResidenceHandler);
  event.currentTarget.addEventListener(event.type, typeOfResidenceHandler);
};

typeOfResidence.addEventListener('change', typeOfResidenceHandler);

const time = document.querySelector('.ad-form__element--time');
const timeHandler = (event) => {
  const timeIn = document.querySelector('#timein');
  const timeOut = document.querySelector('#timeout');
  timeIn.value = timeOut.value = event.target.value;
  event.currentTarget.removeEventListener(event.type, timeHandler);
  event.currentTarget.addEventListener(event.type, timeHandler);
};
time.addEventListener('change', timeHandler);

const numberRooms = document.querySelector('#room_number');

const numberRoomsHandler = (event) => {
  const capacity = document.querySelector('#capacity');
  const item = capacity.children;

  const sort = (number)=> {
    for (let index = 0; index < item.length; index++) {
      item[index].value === number ? item[index].disabled = false : item[index].disabled = true;
    }
  };

  if (numberRooms.value === '1') {
    sort('1');
  } else if (numberRooms.value === '2') {
    for (let index = 0; index < item.length; index++) {
      const itemValue = item[index].value;
      item[index].disabled = !(itemValue === '1' || itemValue === '2');
    }
  } else if (numberRooms.value === '3') {
    for (let index = 0; index < item.length; index++) {
      const itemValue = item[index].value;
      item[index].disabled = !(itemValue === '1' || itemValue === '2' || itemValue === '3');
    }
  } else {
    sort('0');
  }
  event.currentTarget.removeEventListener(event.type, numberRoomsHandler);
  event.currentTarget.addEventListener(event.type, numberRoomsHandler);
};
numberRooms.addEventListener('change', numberRoomsHandler);
