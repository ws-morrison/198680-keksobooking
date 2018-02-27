'use strict';
(function () {


  // //////// Файл map.js Рендер пинов, карточек, их отражение на карте и события

  var ESC_KEYCODE = 27;

  // Рендер пинов
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
    renderOffer(window.data[pinElement.dataset.index]);
  };


  // Рендерит и показывает карточку по клику на пин
  var mainMap = document.querySelector('.map');
  var mapTemplate = document.querySelector('template').content;
  var renderPins = function (offersArray) {

    var docFragmnet = document.createDocumentFragment();
    offersArray.forEach(function (offer, index) {
      var newPin = getPin(offer, index);
      newPin.addEventListener('click', onPinClick);
      docFragmnet.appendChild(newPin);
    });
    mainMap.appendChild(docFragmnet);
  };
  renderPins(window.data);


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
    cardElement.querySelector('h4').textContent = window.ApartmentsTypes[offerObject.offer.type];
    cardElement.querySelector('h4+p').textContent = 'Комнат: ' + offerObject.offer.rooms + ' для ' + offerObject.offer.guests + '  гостей';
    cardElement.querySelector('p:nth-of-type(4)').textContent = 'Заезд: ' + offerObject.offer.checkin + ', выезд: ' + offerObject.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = getFeaturesList(offerObject.offer.features);
    cardElement.querySelector('p').textContent = offerObject.offer.description;
    cardElement.querySelector('.popup__pictures').innerHTML = getPhotosList(offerObject.offer.photos);
    cardElement.querySelector('.popup__avatar').src = offerObject.author.avatar;
    return cardElement;
  };


  var renderOffer = function (offerObject) {
    document.addEventListener('keydown', onCloseButtonKeydown);
    var docFragmnet = document.createDocumentFragment();
    var offerCard = createCardOffer(offerObject);
    docFragmnet.appendChild(offerCard);
    var anotherArticle = mainMap.querySelector('.map__card');
    if (!anotherArticle) {
      mainMap.appendChild(docFragmnet);
      return;
    }
    mainMap.replaceChild(docFragmnet, anotherArticle);
  };

  window.map = {
    closeCurrentOffer: function () {
      var closeCard = document.querySelector('.map__card');
      closeCard.classList.add('hidden');
    }
  };


  var onCloseButtonClick = function (evt) {
    if (evt.target.classList.contains('popup__close')) {
      window.map.closeCurrentOffer();
    }
  };

  var onCloseButtonKeydown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.map.closeCurrentOffer();
    }
  };
  document.addEventListener('click', onCloseButtonClick);

  // Убирает map--faded поставленный по умолчанию
  var removeDefaultFade = function () {
    var fadeMap = document.querySelector('.map');
    fadeMap.classList.remove('map--faded');
  };
  removeDefaultFade();

  // ........ Конец файла map.js

})();
