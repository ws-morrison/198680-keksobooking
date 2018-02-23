'use strict';
// Рендерит и показывает карточку по клику на пин
(function () {
  var mainMap = document.querySelector('.map');
  var mapTemplate = document.querySelector('template').content;
  var renderPins = function (offersArray) {

    //   var docFragmnet = document.createDocumentFragment();
    //   offersArray.forEach(function (offer, index) {
    //     var newPin = getPin(offer, index);
    //     newPin.addEventListener('click', onPinClick);
    //     docFragmnet.appendChild(newPin);
    //   });
    //   mainMap.appendChild(docFragmnet);
    // };
    // renderPins(window.data.makeRandomOffers);

    var docFragmnet = document.createDocumentFragment();
    debugger;
    for (var i = 0; i < offersArray.length; i++) {
      var newPin = getPin(offer, index);
      newPin.addEventListener('click', window.data.onPinClick);
      docFragmnet.appendChild(newPin);
    }
    mainMap.appendChild(docFragmnet);
  };
  renderPins(window.data.makeRandomOffers);

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
    cardElement.querySelector('h4').textContent = window.data.ApartmentsTypes[offerObject.offer.type];
    cardElement.querySelector('h4+p').textContent = 'Комнат: ' + offerObject.offer.rooms + ' для ' + offerObject.offer.guests + '  гостей';
    cardElement.querySelector('p:nth-of-type(4)').textContent = 'Заезд: ' + offerObject.offer.checkin + ', выезд: ' + offerObject.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = getFeaturesList(offerObject.offer.features);
    cardElement.querySelector('p').textContent = offerObject.offer.description;
    cardElement.querySelector('.popup__pictures').innerHTML = getPhotosList(offerObject.offer.photos);
    cardElement.querySelector('.popup__avatar').src = offerObject.author.avatar;
    return cardElement;
  };

  window.cards = {
    renderOffer: function (offerObject) {
      var docFragmnet = document.createDocumentFragment();
      var offerCard = createCardOffer(offerObject);
      docFragmnet.appendChild(offerCard);
      var anotherArticle = mainMap.querySelector('.map__card');
      if (!anotherArticle) {
        mainMap.appendChild(docFragmnet);
        return;
      }
      mainMap.replaceChild(docFragmnet, anotherArticle);
    }
  };
  // var renderOffer = function (offerObject) {
  //   var docFragmnet = document.createDocumentFragment();
  //   var offerCard = createCardOffer(offerObject);
  //   docFragmnet.appendChild(offerCard);
  //   var anotherArticle = mainMap.querySelector('.map__card');
  //   if (!anotherArticle) {
  //     mainMap.appendChild(docFragmnet);
  //     return;
  //   }
  //   mainMap.replaceChild(docFragmnet, anotherArticle);
  // };

  var closeCurrentOffer = function () {
    var closeCard = document.querySelector('.map__card');
    closeCard.classList.add('hidden');
  };
  var onCloseButtonClick = function (evt) {
    if (evt.target.classList.contains('popup__close')) {
      closeCurrentOffer();
    }
  };
  var onCloseButtonKeydown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeCurrentOffer();
      document.removeEventListener('keydown', closeCurrentOffer);
    }
  };

  document.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onCloseButtonKeydown);
  document.removeEventListener('keydown', closeCurrentOffer);

  // window.cards = cards;
})();
