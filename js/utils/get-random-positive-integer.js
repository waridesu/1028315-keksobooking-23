
const getRandomPositiveInteger = (min, max) => {

  const LOWER = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const UPPER = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  const RESULT = Math.random() * (UPPER - LOWER + 1) + LOWER;

  return Math.floor(RESULT);
};

export {getRandomPositiveInteger};
