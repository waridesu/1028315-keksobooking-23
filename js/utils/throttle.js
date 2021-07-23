// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle

const throttle = (callback, delayBetweenFrames) => {
  let lastTime = 0;

  return (...rest) => {
    const NOW = new Date();

    if (NOW - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = NOW;
    }
  };
};

export {throttle};
