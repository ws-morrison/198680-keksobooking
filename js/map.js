'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var ApartmentsTypes = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
    palace: 'Дворец'
  };

  var mainMap = document.querySelector('.map');
  var mapTemplate = document.querySelector('template').content;


  // Рендер пинов
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

  var onPinClick = function (evt) {
    var pinElement = evt.currentTarget;
    renderOffer(window.data[pinElement.dataset.index]);
  };

  var renderPins = function (offersArray, additionalClass) {

    var docFragmnet = document.createDocumentFragment();

    offersArray.forEach(function (offer, index) {
      var newPin = getPin(offer, index, additionalClass);
      newPin.addEventListener('click', onPinClick);
      docFragmnet.appendChild(newPin);
    });

    mainMap.appendChild(docFragmnet);
  };


  // Добавляет иконки Features
  var getFeaturesList = function (featuresArray) {
    var featuresList = '';
    for (var i = 0; i < featuresArray.length; i++) {
      featuresList = '<li class="feature feature--' + featuresArray[i] + '"></li>' + featuresList;
    }
    return featuresList;
  };

  // Добавляет фотографии PHOTOS
  var getPhotosList = function (photosArray) {
    var photosItem = '';
    for (var i = 0; i < photosArray.length; i++) {
      photosItem = '<li>' + '<img src =' + photosArray[i] + ' width = 60px, height = 60px style = "margin: 5px"></li>' + photosItem;
    }
    return photosItem;
  };

  // Создает и клонирует карточку
  var createCardOffer = function (offerObject) {
    var cardElement = mapTemplate.querySelector('.map__card').cloneNode(true);
    cardElement.querySelector('h3').textContent = offerObject.offer.title;
    cardElement.querySelector('h3+p').textContent = offerObject.offer.address;
    cardElement.querySelector('.popup__price').textContent = offerObject.offer.price + ' \u00A5/ночь ';
    cardElement.querySelector('h4').textContent = ApartmentsTypes[offerObject.offer.type];
    cardElement.querySelector('h4+p').textContent = 'Комнат: ' + offerObject.offer.rooms + ' для ' + offerObject.offer.guests + '  гостей';
    cardElement.querySelector('p:nth-of-type(4)').textContent = 'Заезд: ' + offerObject.offer.checkin + ', выезд: ' + offerObject.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = getFeaturesList(offerObject.offer.features);
    cardElement.querySelector('p').textContent = offerObject.offer.description;
    cardElement.querySelector('.popup__pictures').innerHTML = getPhotosList(offerObject.offer.photos);
    cardElement.querySelector('.popup__avatar').src = offerObject.author.avatar;
    return cardElement;
  };

  var addCloseCardOfferListeners = function (offerCard) {
    var closeBtn = offerCard.querySelector('.popup__close');
    closeBtn.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onCloseButtonKeydown);
  };

  var dropCLoseCardOfferListeners = function (offerCard) {
    var closeBtn = offerCard.querySelector('.popup__close');
    closeBtn.removeEventListener('click', onCloseButtonClick);
    document.removeEventListener('keydown', onCloseButtonKeydown);
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

  var onCloseButtonClick = function (evt) {
    if (evt.target.classList.contains('popup__close')) {
      dropCLoseCardOfferListeners(evt.target.parentNode);
      closeCurrentOffer();
    }
  };

  var onCloseButtonKeydown = function (evt) {
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


  removeDefaultFade();


  window.backend.load(function (data) {
    window.data = data;
    renderPins(window.data, 'hidden');
  });


  window.map = {
    renderPins: renderPins,
    closeCurrentOffer: closeCurrentOffer
  };
})();
