const typeOfResidence = document.querySelector('#type');
window.onload = function () {
  if (typeOfResidence.value === 'bungalow') {
    const priceByNight = document.querySelector('#price');
    priceByNight.value = 0;
  }
};

typeOfResidence.addEventListener('change', (event) => {
  const priceByNight = document.querySelector('#price');
  switch (event.target.value) {
    case 'bungalow':
      return priceByNight.value = 0;
    case 'flat':
      return priceByNight.value = 1000;
    case 'hotel':
      return priceByNight.value = 3000;
    case 'house':
      return priceByNight.value = 5000;
    case 'palace':
      return priceByNight.value = 10000;
  }
});

const time = document.querySelector('.ad-form__element--time');

time.addEventListener('change', (event) => {
  const timeIn = document.querySelector('#timein');
  const timeOut = document.querySelector('#timeout');
  timeIn.value = timeOut.value = event.target.value;
});

const numberRooms = document.querySelector('#room_number');

numberRooms.addEventListener('change', () => {
  const capacity = document.querySelector('#capacity');
  const item = capacity.children;

  function sort(number) {
    for (let index = 0; index < item.length; index++) {
      item[index].value === number ? item[index].disabled = false : item[index].disabled = true;
    }
    capacity.value = number;
  }

  if (numberRooms.value === '1') {
    sort('1');
  } else if (numberRooms.value === '2') {
    for (let index = 0; index < item.length; index++) {
      const itemValue = item[index].value;
      item[index].disabled = !(itemValue === '1' || itemValue === '2' );
      capacity.value = '1';
    }
  } else if (numberRooms.value === '3') {
    for (let index = 0; index < item.length; index++) {
      const itemValue = item[index].value;
      item[index].disabled = !(itemValue === '1' || itemValue === '2' || itemValue === '3');
      capacity.value = '1';
    }
  } else {
    sort('0');
  }
});

