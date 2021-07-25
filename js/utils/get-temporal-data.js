import {getCoordinatesNumber} from './get-coordinates-number.js';
import {getRandomNumber} from './get-random-number.js';

const createArr = ([...source], maxLength) => Array.from({length: Math.min(source.length, 1 + Math.random() * maxLength | 0)},
  () => source.splice(Math.random() * source.length | 0, 1)[0]);


const createTemporalData = () => {
  let obj = {};
  // any fixed v
  // alue and i make it as number
  const MAIN_MARKER_WIDTH = {
    FROM: 35.65000,
    TO: 35.70000,
  };
  const MAIN_MARKER_HEIGHT = {
    FROM: 139.70000,
    TO: 139.80000,
  };
  const PRISE_SCATTER = {
    MIN: 1000,
    MAX: 5000,
  };
  const ROOMS_GUESTS = {
    MIN: 1,
    MAX: 5,
  };
  const HOURS = ['12:00', '13:00', '13:00'];
  const HOURS_SCATTER = {
    MIN: 0,
    MAX: HOURS.length - 1,
  };
  const PALACE = 'Дворец';
  const FLAT = 'Квартира';
  const HOUSE = 'Дом';
  const BUNGALOW = 'Бунгало';
  const HOTEL = 'Отель';
  const TYPES = [PALACE, FLAT, HOUSE, BUNGALOW, HOTEL];
  const TYPES_SCATTER = {
    MIN: 0,
    MAX: TYPES.length - 1,
  };
  // string array from values
  const WIFI = 'wifi';
  const DISHWASHER = 'dishwasher';
  const PARKING = 'parking';
  const WASHER = 'washer';
  const ELEVATOR = 'elevator';
  const CONDITIONER = 'conditioner';
  const FEATURES = [WIFI, DISHWASHER, PARKING, WASHER, ELEVATOR, CONDITIONER];
  const PHOTOS = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ];
  const filledData = [];
  for (let index = 1; index <= 10; index++) {
    const LOCATION_LAT = getCoordinatesNumber(MAIN_MARKER_WIDTH.FROM, MAIN_MARKER_WIDTH.TO, 5);
    const LOCATION_LNG = getCoordinatesNumber(MAIN_MARKER_HEIGHT.FROM, MAIN_MARKER_HEIGHT.TO, 5);
    obj = {
      author: {avatar: `img/avatars/user${(index < 10 ? '0' : '') + index}.png`},
      offer: {
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
          ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        address: `${LOCATION_LAT} ${LOCATION_LNG}`,
        price: getRandomNumber(PRISE_SCATTER.MIN, PRISE_SCATTER.MAX),
        type: TYPES[getRandomNumber(TYPES_SCATTER.MIN, TYPES_SCATTER.MAX)],
        rooms: getRandomNumber(ROOMS_GUESTS.MIN, ROOMS_GUESTS.MAX),
        guests: getRandomNumber(ROOMS_GUESTS.MIN, ROOMS_GUESTS.MAX),
        checkin: HOURS[getRandomNumber(HOURS_SCATTER.MIN, HOURS_SCATTER.MAX)],
        checkout: HOURS[getRandomNumber(HOURS_SCATTER.MIN, HOURS_SCATTER.MAX)],
        features: createArr([...FEATURES], 6),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
          ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        photos: createArr([...PHOTOS], 3),
      },
      location: {
        lat: LOCATION_LAT,
        lng: LOCATION_LNG,
      },
    };
    filledData.push(obj);
  }
  return filledData;
};

export {createTemporalData};
