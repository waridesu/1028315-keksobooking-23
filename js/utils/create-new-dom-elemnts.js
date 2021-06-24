import {createTemporalData} from './get-temporal-data.js';

const offerArray = createTemporalData();
const cardTemplate = document.querySelector('#card').content;

function createNewDomElement(item) {
  const cardAvatar = cardTemplate.querySelector('.popup__avatar');
  const cardTitle = cardTemplate.querySelector('.popup__title');
  const cardAddress = cardTemplate.querySelector('.popup__text--address');
  const cardPrice = cardTemplate.querySelector('.popup__text--price');
  const cardType = cardTemplate.querySelector('.popup__type');
  const cardGuestsNumber = cardTemplate.querySelector('.popup__text--capacity');
  const cardInOutTime = cardTemplate.querySelector('.popup__text--time');
  const cardFeatures = cardTemplate.querySelector('.popup__features');
  const cardDescription = cardTemplate.querySelector('.popup__description');
  const cardPhotos = cardTemplate.querySelector('.popup__photos');

  function removeChild(element) {
    for (let index = element.children.length - 1; index >= 0; index--) {
      const child = element.children[index];
      child.parentElement.removeChild(child);
    }
  }

  function hideIfNull(params, element) {
    if (!params) {
      element.classList.add('hidden');
    }
  }

  cardAvatar.src = item.author.avatar;
  hideIfNull(item.author.avatar, cardAvatar);
  cardTitle.innerText = item.offer.title;
  hideIfNull(item.offer.title, cardTitle);
  cardAddress.innerText = item.offer.address;
  hideIfNull(item.offer.address, cardAddress);
  cardPrice.innerText = `${item.offer.price} ₽/ночь`;
  hideIfNull(item.offer.price, cardPrice);
  cardType.innerText = item.offer.type;
  hideIfNull(item.offer.type, cardType);
  cardGuestsNumber.innerText = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;
  hideIfNull((item.offer.rooms && item.offer.guests), cardGuestsNumber);
  cardInOutTime.innerText = `${item.offer.checkin}, выезд до ${item.offer.checkout}`;
  hideIfNull((item.offer.checkin && item.offer.checkout), cardInOutTime);
  removeChild(cardFeatures);
  item.offer.features.forEach((element) => cardFeatures.innerHTML +=
    `<li class="popup__feature popup__feature--${element}"></li>`);
  hideIfNull(item.offer.features, cardFeatures);
  cardDescription.innerText = item.offer.description;
  hideIfNull(item.offer.description, cardDescription);
  removeChild(cardPhotos);
  item.offer.photos.forEach((element) => cardPhotos.innerHTML +=
    `<img src="${element}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
  hideIfNull(item.offer.photos, cardPhotos);
  return cardTemplate;
}

const map = [];
offerArray.forEach((value) => map.push(createNewDomElement(value)));

const canvasBlock = document.querySelector('#map-canvas');
canvasBlock.append(createNewDomElement(offerArray[0]));

export {createNewDomElement};
