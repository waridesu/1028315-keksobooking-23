import {getCoordinatesNumber} from './get-coordinates-number.js';
import {getRandomNumber} from './get-random-number.js';

const createArr = ([...source], maxLength) => Array.from({length: Math.min(source.length, 1 + Math.random() * maxLength | 0)},
  () => source.splice(Math.random() * source.length | 0, 1)[0]);


const createTemporalData = () => {
  let obj = {};
  // any fixed v
  // alue and i make it as number
  const PALACE = 'Дворец';
  const FLAT = 'Квартира';
  const HOUSE = 'Дом';
  const BUNGALOW = 'Бунгало';
  const HOTEL = 'Отель';
  const TYPES = [PALACE, FLAT, HOUSE, BUNGALOW, HOTEL];
  const HOURS = ['12:00', '13:00', '13:00'];
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
    const LOCATION_LAT = getCoordinatesNumber(35.65000, 35.70000, 5);
    const LOCATION_LNG = getCoordinatesNumber(139.70000, 139.80000, 5);
    obj = {
      author: {avatar: `img/avatars/user${(index < 10 ? '0' : '') + index}.png`},
      offer: {
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
          ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        address: `${LOCATION_LAT} ${LOCATION_LNG}`,
        price: getRandomNumber(1000, 5000),
        type: TYPES[getRandomNumber(0, TYPES.length - 1)],
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 5),
        checkin: HOURS[getRandomNumber(0, HOURS.length - 1)],
        checkout: HOURS[getRandomNumber(0, HOURS.length - 1)],
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
