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
var getRandomNumRange = function(min, max) {
  return Math.floor(Math.random() * (min + max));
}

// Функция возврата случайного элемента из массива
var getRandomElement = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Функция перестасовки массива Фишера - Йетса
var getShuffleArray = function(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var rand = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[rand];
    arr[rand] = temp;
  }
  return arr;
};

// Функция возврата случайного количества строк из массива
var getRandomLengthArr = function(arr) {
  return arr.slice(getRandomNumRange(1, arr.length));
};

// Функция возращает каждый раз новый перетасованный массив
var getSortArr = function(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i]
  }
  return arr.slice(getShuffleArray(arr));
}

var makeRandomOffers = function() {
  var offersResult = [];
  var shuffledAvatars = getShuffleArray(AVATARS);
  var shuffledTitles = getShuffleArray(TITLES);

  for (var i = 0; i < OFFER_COUNT; i++) {

    var randomLocationX = getRandomNumRange(300, 900);
    var randomLocationY = getRandomNumRange(100, 500);

    offersResult.push({
      'author': {
        'avatar': 'img/avatars/user' + shuffledAvatars[i], //Перетасованный массив AVATARS
      },
      'offer': {
        'title': shuffledTitles[i], // Перетасованный массив TITLES
        'address': randomLocationX + ', ' + randomLocationY, // Строка, адрес предложения, представляет собой запись вида '{{location.x}}, {{location.y}}'
        'price': getRandomNumRange(offerPrice.min, offerPrice.max), // Случайное число offerPrices 1000 - 1 000 000
        'type': getRandomElement(TYPES), // Строка с одним из трех фиксированных значений: flat, house или bungalo
        'rooms': getRandomNumRange(offerRooms.min, offerRooms.max), // Случайное число offerRooms 1-5
        'guests': getRandomNumRange(offerGuests.min, offerGuests.max), // Случайное число offerGuests 1-12
        'checkin': getRandomElement(TIMES_CHECK_IN), // Перетасованный массив TIMES_CHECK_IN
        'checkout': getRandomElement(TIMES_CHECK_OUT), // Перетасованный массив TIMES_CHECK_OUT
        'features': getRandomLengthArr(FEATURES), // Массив строк случайной длины из FEATURES
        'description': '',
        'photos': getSortArr(PHOTOS) // Массив из строк PHOTOS расположенных в произвольном порядке
      },
      'location': {
        'x': randomLocationX, // Случайное число координата x метки на карте от 300 до 900
        'y': randomLocationY, // Случайное число, координата y метки на карте от 150 до 500
      }
    })
  }
  return offersResult;
};

var allOffers = makeRandomOffers();
console.log(allOffers);


var mapFade = document.querySelector('.map');
mapFade.classList.remove('map--faded');

var mapTemplate = document.querySelector('template');
console.log(mapTemplate);
