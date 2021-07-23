const typeOfResidence = document.querySelector('#type');
window.onload = () => {
  if (typeOfResidence.value === 'bungalow') {
    const priceByNight = document.querySelector('#price');
    priceByNight.value = 0;
  }
};
const typeOfResidenceHandler = (event) => {
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
  event.currentTarget.removeEventListener(event.type, typeOfResidenceHandler);
  event.currentTarget.addEventListener(event.type, typeOfResidenceHandler);
};

typeOfResidence.addEventListener('change', typeOfResidenceHandler);

const time = document.querySelector('.ad-form__element--time');
const timeHandler = (event)=> {
  const timeIn = document.querySelector('#timein');
  const timeOut = document.querySelector('#timeout');
  timeIn.value = timeOut.value = event.target.value;

};
time.addEventListener('change', timeHandler);
