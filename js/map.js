'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var PINS_LIMIT = 5;

  var ApartmentsTypes = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
    palace: 'Дворец'
  };

  var mainMap = document.querySelector('.map');
  var mapTemplate = document.querySelector('template').content;

  var getPin = function (offer, id, additionalClass) {
    var pinElement = mapTemplate.querySelector('.map__pin').cloneNode(true);

    pinElement.style.left = offer.location.x + 'px';
    pinElement.style.top = offer.location.y + 'px';
    pinElement.dataset.index = id;
    pinElement.querySelector('img').src = offer.author.avatar;

    if (additionalClass) {
      pinElement.classList.add(additionalClass);
    }

    return pinElement;
  };

  var pinClickHandler = function (evt) {
    var pinElement = evt.currentTarget;

    if (window.map.filtredOffers.length === 0) {
      return renderOffer(window.data[pinElement.dataset.index]);
    }

    return renderOffer(window.map.filtredOffers[pinElement.dataset.index]);

  };

  var renderPins = function (offersArray, additionalClass) {
    offersArray.slice(0, PINS_LIMIT);
    var docFragmnet = document.createDocumentFragment();

    offersArray.forEach(function (offer, index) {
      var newPin = getPin(offer, index, additionalClass);
      newPin.addEventListener('click', pinClickHandler);
      docFragmnet.appendChild(newPin);
    });
    mainMap.appendChild(docFragmnet);
  };

  var getFeaturesList = function (featuresArray) {
    var featuresList = '';
    for (var i = 0; i < featuresArray.length; i++) {
      featuresList = '<li class="feature feature--' + featuresArray[i] + '"></li>' + featuresList;
    }
    return featuresList;
  };

  var getPhotosList = function (photosArray) {
    var photosItem = '';
    for (var i = 0; i < photosArray.length; i++) {
      photosItem = '<li>' + '<img src =' + photosArray[i] + ' width = 55px, height = 55px style = "margin: 2px"></li>' + photosItem;
    }
    return photosItem;
  };

  var createCardOffer = function (offerObject) {
    var cardElement = mapTemplate.querySelector('.map__card').cloneNode(true);
    cardElement.querySelector('h3').textContent = offerObject.offer.title;
    cardElement.querySelector('small').textContent = offerObject.offer.address;
    cardElement.querySelector('.popup__price').textContent = offerObject.offer.price + ' \u20bd/ночь ';
    cardElement.querySelector('h4').textContent = ApartmentsTypes[offerObject.offer.type];
    cardElement.querySelector('h4+p').textContent = 'Комнат: ' + offerObject.offer.rooms + ' для ' + offerObject.offer.guests + '  гостей';
    cardElement.querySelector('p:nth-of-type(4)').textContent = 'Заезд: ' + offerObject.offer.checkin + ', выезд: ' + offerObject.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = getFeaturesList(offerObject.offer.features);
    cardElement.querySelector('p:last-of-type').textContent = offerObject.offer.description;
    cardElement.querySelector('.popup__pictures').innerHTML = getPhotosList(offerObject.offer.photos);
    cardElement.querySelector('.popup__avatar').src = offerObject.author.avatar;
    return cardElement;
  };

  var addCloseCardOfferListeners = function (offerCard) {
    var closeBtn = offerCard.querySelector('.popup__close');
    closeBtn.addEventListener('click', closeClickHandler);
    document.addEventListener('keydown', closeKeydownHandler);
  };

  var dropCLoseCardOfferListeners = function (offerCard) {
    var closeBtn = offerCard.querySelector('.popup__close');
    closeBtn.removeEventListener('click', closeClickHandler);
    document.removeEventListener('keydown', closeKeydownHandler);
  };

  var renderOffer = function (offerObject) {
    var docFragmnet = document.createDocumentFragment();
    var offerCard = createCardOffer(offerObject);

    addCloseCardOfferListeners(offerCard);

    docFragmnet.appendChild(offerCard);

    var anotherArticle = mainMap.querySelector('.map__card');

    if (!anotherArticle) {
      mainMap.appendChild(docFragmnet);
      return;
    }
    mainMap.replaceChild(docFragmnet, anotherArticle);
  };

  var closeClickHandler = function (evt) {
    if (evt.target.classList.contains('popup__close')) {
      dropCLoseCardOfferListeners(evt.target.parentNode);
      closeCurrentOffer();
    }
  };

  var closeKeydownHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      var offerCard = mainMap.querySelector('.map__card');
      dropCLoseCardOfferListeners(offerCard);
      closeCurrentOffer();
    }
  };

  var closeCurrentOffer = function () {
    var closeCard = document.querySelector('.map__card');
    if (closeCard) {
      closeCard.classList.add('hidden');
    }
  };

  var removeDefaultFade = function () {
    var fadeMap = document.querySelector('.map');
    fadeMap.classList.remove('map--faded');
  };

  var removeAllPins = function () {
    var allRenderedPins = document.querySelectorAll('.map__pin');

    for (var i = 0; i < allRenderedPins.length; i++) {
      if (allRenderedPins[i].classList.contains('map__pin--main')) {
        continue;
      }

      mainMap.removeChild(allRenderedPins[i]);
    }
  };


  removeDefaultFade();


  window.backend.load(function (data) {
    window.data = data;

    renderPins(window.data, 'hidden');
  });


  window.map = {
    renderPins: renderPins,
    closeCurrentOffer: closeCurrentOffer,
    removeAllPins: removeAllPins,
    filtredOffers: []
  };

})();
