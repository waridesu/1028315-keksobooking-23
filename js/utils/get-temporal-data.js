import {getCoordinatesNumber} from './get-coordinates-number.js';
import {getRandomNumber} from './get-random-number.js';

function createArr([...source], maxLength) {
  return Array.from({length: Math.min(source.length, 1 + Math.random() * maxLength | 0)},
    () => source.splice(Math.random() * source.length | 0, 1)[0]);
}

function createTemporalData() {
  let obj = {};
  // any fixed value and i make it as number
  const palace = 'Дворец';
  const flat = 'Квартира';
  const house = 'Дом';
  const bungalow = 'Бунгало';
  const hotel = 'Отель';
  const type = [palace, flat, house, bungalow, hotel];
  const time = ['12:00', '13:00', '13:00'];
  // string array from values
  const wifi = 'wifi';
  const dishwasher = 'dishwasher';
  const parking = 'parking';
  const washer = 'washer';
  const elevator = 'elevator';
  const conditioner = 'conditioner';
  const featuresArray = [wifi, dishwasher, parking, washer, elevator, conditioner];
  const photosArray = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ];
  const filledData = [];
  for (let index = 1; index <= 10; index++) {
    const locationLat = getCoordinatesNumber(35.65000, 35.70000, 5);
    const locationLng = getCoordinatesNumber(139.70000, 139.80000, 5);
    obj = {
      author: {avatar: `img/avatars/user${(index < 10 ? '0' : '') + index}.png`},
      offer: {
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
          ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' ,
        address: `${locationLat} ${locationLng}`,
        price: getRandomNumber(1000, 5000),
        type: type[getRandomNumber(0, type.length - 1)],
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 5),
        checkin: time[getRandomNumber(0, time.length - 1)],
        checkout: time[getRandomNumber(0, time.length - 1)],
        features: createArr([...featuresArray], 6),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
          ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        photos: createArr([...photosArray], 3),
      },
      location: {
        lat: locationLat,
        lng: locationLng,
      },
    };
    filledData.push(obj);
  }
  return filledData;
}

createTemporalData();

export  { createTemporalData };
