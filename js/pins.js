'use strict';

// Рендер пинов
(function () {
  var getPin = function (offer, id) {
    var pinElement = mapTemplate.querySelector('.map__pin').cloneNode(true);
    pinElement.style.left = offer.location.x + 55 + 'px';
    pinElement.style.top = offer.location.y + 55 + 'px';
    pinElement.dataset.index = id;
    pinElement.querySelector('img').src = offer.author.avatar;
    return pinElement;
  };


  var onPinClick = function (evt) {
    var pinElement = null;
    pinElement = evt.target;
    if (evt.target.tagName === 'IMG') {
      pinElement = evt.target.parentNode;
    }
    renderOffer(window.data.makeRandomOffers[pinElement.dataset.index]);
  };

  window.pins = pins;
})();
