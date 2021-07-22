// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

const getRandomPositiveFloat = (min, max, digits = 1) => {

  const LOWER = Math.min(Math.abs(min), Math.abs(max));
  const UPPER = Math.max(Math.abs(min), Math.abs(max));

  const RESULT = Math.random() * (UPPER - LOWER) + LOWER;


  return RESULT.toFixed(digits);
};
getRandomPositiveFloat(1, 10, 1);

export {getRandomPositiveFloat};
