const getCoordinatesNumber = (min, max, toFixed)=> {
  if (min >= max && Math.sign((Math.random() * (max - min) + min).toFixed(toFixed)) < 0) {
    return 'wrong set diapason of min and max, min higher max value or result negative number. Try again';
  }
  return (Math.random() * (max - min) + min).toFixed(toFixed);
};

export { getCoordinatesNumber };
