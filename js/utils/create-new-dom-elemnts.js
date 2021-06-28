function createNewDomElement(item) {
  function hideIfNull(params) {
    return !params ? 'hidden' : '';
  }

  return `<article class="popup">
            <img src="${item.author.avatar}" class="popup__avatar ${hideIfNull(item.author.avatar)}" width="70" height="70" alt="Аватар пользователя">
            <h3 class="popup__title ${hideIfNull(item.offer.title)}">${item.offer.title}</h3>
            <p class="popup__text popup__text--address ${hideIfNull(item.offer.address)}">${item.offer.address}</p>
            <p class="popup__text popup__text--price ${hideIfNull(item.offer.price)}">${item.offer.price} <span>₽/ночь</span></p>
            <h4 class="popup__type ${hideIfNull(item.offer.type)}">${item.offer.type}</h4>
            <p class="popup__text popup__text--capacity ${hideIfNull(item.offer.rooms && item.offer.guests)}">${item.offer.rooms} комнаты для ${item.offer.guests} гостей</p>
            <p class="popup__text popup__text--time ${hideIfNull(item.offer.checkin && item.offer.checkout)}">${item.offer.checkin}, выезд до ${item.offer.checkout}</p>
            <ul class="popup__features ${hideIfNull(item.offer.features)}">
              ${item.offer.features.map((element) => `<li class="popup__feature popup__feature--${element}"></li>`).join('')}
            </ul>
            <p class="popup__description ${hideIfNull(item.offer.description)}">${item.offer.description}</p>
            <div class="popup__photos ${hideIfNull(item.offer.photos)}">
              ${item.offer.photos.map((element) => `<img src="${element}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`).join('')}
            </div>
          </article>`;
}

export {createNewDomElement};
