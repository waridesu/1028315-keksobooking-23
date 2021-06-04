// source https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomNumber(10, 20);

function getCoordinatesNumber(min, max, toFixed) {
  if (min >= max) {
    return 'wrong set diapason of min and max value,min are higher than max. Try again';
  }
  return (Math.random() * (max - min) + min).toFixed(toFixed);
}

getCoordinatesNumber(0.002, 0.05, 4);
