const getRandomPositiveFloat = (min, max, digits = 1) => {

  const LOWER = Math.min(Math.abs(min), Math.abs(max));
  const UPPER = Math.max(Math.abs(min), Math.abs(max));

  const RESULT = Math.random() * (UPPER - LOWER) + LOWER;

  return RESULT.toFixed(digits);
};

export {getRandomPositiveFloat};
