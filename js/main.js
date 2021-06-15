// source https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomNumber(10, 20);

function getCoordinatesNumber(min, max, toFixed) {
  if (min >= max && Math.sign((Math.random() * (max - min) + min).toFixed(toFixed)) < 0) {
    return 'wrong set diapason of min and max, min higher max value or result negative number. Try again';
  }
  return (Math.random() * (max - min) + min).toFixed(toFixed);
}

getCoordinatesNumber(0.002, 0.05, 4);

function createArr([...source], maxLength) {
  return Array.from({length: Math.min(source.length, 1 + Math.random() * maxLength | 0)},
    () => source.splice(Math.random() * source.length | 0, 1)[0]);
}

function createTemporalData() {
  let obj = {};
  // eslint-disable-next-line no-undef
  const type = [palace = 1, flat = 2, house = 3, bungalow = 4, hotel = 5];
  const time = ['12:00', '13:00', '13:00'];

  // eslint-disable-next-line no-undef
  const featuresArray = [wifi = 1, dishwasher = 2, parking = 3, washer = 4, elevator = 5, conditioner = 6];
  const photosArray = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg,' +
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ];
  const filledData = [];

  // eslint-disable-next-line id-length
  for (let i = 1; i <= 10; i++) {
    obj = {
      author: {avatar: `img/avatars/user${(i < 10 ? '0' : '') + i}.png`},
      location: {
        lat: getCoordinatesNumber(35.65000, 35.70000, 5),
        lng: getCoordinatesNumber(35.65000, 35.70000, 5),
      },
      offer: {
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
          ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
          ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi' +
          ' ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit' +
          ' in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur' +
          ' sint occaecat cupidatat non proident, sunt in culpa qui officia' +
          ' deserunt mollit anim id est laborum.',
        address: this.location.lat,
        price: getRandomNumber(1000, 5000),
        type: type[getRandomNumber(0, type.length - 1)],
        rooms: getRandomNumber(1, 5),
        checkin: time[getRandomNumber(0, time.length - 1)],
        checkout: time[getRandomNumber(0, time.length - 1)],
        features: createArr([...featuresArray], 6),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
          ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
          ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi' +
          ' ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit' +
          ' in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur' +
          ' sint occaecat cupidatat non proident, sunt in culpa qui officia' +
          ' deserunt mollit anim id est laborum.',
        photos: createArr([...photosArray], 3),
      },
    };
    filledData.push(obj);
  }
}

createTemporalData();
