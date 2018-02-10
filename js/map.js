'use strict';

var OFFER_COUNT = 8;

var AVATARS = [
  '01.png',
  '02.png',
  '03.png',
  '04.png',
  '05.png',
  '06.png',
  '07.png',
  '08.png'
];

var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var TYPES = [
  'flat',
  'house',
  'bungalo'
];

var ApartmentsTypes = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var TIMES_CHECK_IN = [
  '12:00',
  '13:00',
  '14:00'
];

var TIMES_CHECK_OUT = [
  '12:00',
  '13:00',
  '14:00'
];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var offerPrice = {
  min: 1000,
  max: 1000000,
};

var offerRooms = {
  min: 1,
  max: 5,
};

var offerGuests = {
  min: 1,
  max: 12,
};

// Функция случайного числа из диапазона
var getRandomNumRange = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Функция возврата случайного элемента из массива
var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Функция перестасовки массива Фишера - Йетса
var getShuffleArray = function (arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var rand = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[rand];
    arr[rand] = temp;
  }
  return arr;
};

// Функция возврата случайного количества строк из массива
var getRandomLengthArr = function (arr) {
  return arr.slice(getRandomNumRange(1, arr.length));
};

// Функция возращает каждый раз новый перетасованный массив Ф-Й
var getSortArr = function (arr) {
  for (var i = 0; i < arr.length; i++) {}
  return arr.slice(getShuffleArray(arr));
};

var makeRandomOffers = function () {
  var offersResult = [];
  var shuffledAvatars = getShuffleArray(AVATARS);
  var shuffledTitles = getShuffleArray(TITLES);

  for (var i = 0; i < OFFER_COUNT; i++) {

    var randomLocationX = getRandomNumRange(300, 900);
    var randomLocationY = getRandomNumRange(100, 500);

    offersResult.push({
      'author': {
        'avatar': 'img/avatars/user' + shuffledAvatars[i],
      },
      'offer': {
        'title': shuffledTitles[i],
        'address': randomLocationX + ', ' + randomLocationY,
        'price': getRandomNumRange(offerPrice.min, offerPrice.max),
        'type': getRandomElement(TYPES),
        'rooms': getRandomNumRange(offerRooms.min, offerRooms.max),
        'guests': getRandomNumRange(offerGuests.min, offerGuests.max),
        'checkin': getRandomElement(TIMES_CHECK_IN),
        'checkout': getRandomElement(TIMES_CHECK_OUT),
        'features': getRandomLengthArr(FEATURES),
        'description': '',
        'photos': getSortArr(PHOTOS)
      },
      'location': {
        'x': randomLocationX,
        'y': randomLocationY,
      }
    });
  }
  return offersResult;
};

var allOffers = makeRandomOffers();

var mapFade = document.querySelector('.map');
mapFade.classList.remove('map--faded');

var mapTemplate = document.querySelector('template').content;


// Рендер пинов
var getPin = function (offer, id) {
  var pinElement = mapTemplate.querySelector('.map__pin').cloneNode(true);
  pinElement.style.left = offer.location.x + 24 + 'px';
  pinElement.style.top = offer.location.y + 24 + 'px';
  pinElement.dataset.index = id;
  pinElement.querySelector('img').src = offer.author.avatar;
  return pinElement;
};

var renderPins = function (offersArray) {
  var docFragmnet = document.createDocumentFragment();
  offersArray.forEach(function (offer, index) {
    docFragmnet.appendChild(getPin(offer, index));
  });
  mapFade.appendChild(docFragmnet);
};
renderPins(allOffers);

// Добавляет иконки Features
var getFeaturesList = function (featuresArray) {
  var featuresList = '';
  for (var i = 0; i < featuresArray.length; i++) {
    featuresList = '<li class="feature feature--' + featuresArray[i] + '"></li>' + featuresList;
  }
  return featuresList;
};
-
// Добавляет фотографии PHOTOS
var getPhotosList = function (photosArray) {
  var photosItem = '';
  for (var i = 0; i < photosArray.length; i++) {
    photosItem = '<li>' + '<img src =' + photosArray[i] + ' width = 60px, height = 60px style = "margin: 5px"></li>' + photosItem;
  }
  return photosItem;
};

var createCardOffer = function (offerObject) {
  var cardElement = mapTemplate.querySelector('.map__card').cloneNode(true);
  cardElement.querySelector('h3').textContent = offerObject.offer.title;
  cardElement.querySelector('h3+p').textContent = offerObject.offer.address;
  cardElement.querySelector('.popup__price').textContent = offerObject.offer.price + ' \u20bd/ночь ';
  cardElement.querySelector('h4').textContent = ApartmentsTypes[offerObject.offer.type];
  cardElement.querySelector('h4+p').textContent = 'Комнат: ' + offerObject.offer.rooms + ' для ' + offerObject.offer.guests + '  гостей';
  cardElement.querySelector('p:nth-of-type(4)').textContent = 'Заезд: ' + offerObject.offer.checkin + ', выезд: ' + offerObject.offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = getFeaturesList(offerObject.offer.features);
  cardElement.querySelector('p').textContent = offerObject.offer.description;
  cardElement.querySelector('.popup__pictures').innerHTML = getPhotosList(offerObject.offer.photos);
  cardElement.querySelector('.popup__avatar').src = offerObject.author.avatar;
  return cardElement;
};

var renderOffer = function (offerObject) {
  var docFragmnet = document.createDocumentFragment();
  var offerCard = createCardOffer(offerObject);
  docFragmnet.appendChild(offerCard);
  mapFade.appendChild(docFragmnet);
};

renderOffer(allOffers[0]);
