const typeOfResidence = document.querySelector('#type');
if(typeOfResidence.value === 'bungalow'){
  const priceByNight = document.querySelector('#price');
  priceByNight.value = 0;
}
typeOfResidence.addEventListener('change', (event) => {
  const priceByNight = document.querySelector('#price');
  switch(event.target.value) {
    case 'bungalow': return priceByNight.value = 0;
    case 'flat': return priceByNight.value = 1000;
    case 'hotel': return priceByNight.value = 3000;
    case 'house': return priceByNight.value = 5000;
    case 'palace': return priceByNight.value = 10000;
  }
});

const time = document.querySelector('.ad-form__element--time');

time.addEventListener('change', (event)=>{
  const timeIn = document.querySelector('#timein');
  const timeOut = document.querySelector('#timeout');
  timeIn.value = timeOut.value = event.target.value;
});
