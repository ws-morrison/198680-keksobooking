'use strict';

// ////////// Файл data.js Константы, переменные, ут функции и сгенерированый объект

(function () {
  window.data = {
    AVAT: ['01.png',
      '02.png',
      '03.png',
      '04.png',
      '05.png',
      '06.png',
      '07.png',
      '08.png'
    ],

  }
  var OFFER_COUNT = 8;

  var ESC_KEYCODE = 27;

  // var AVATARS = [
  //   '01.png',
  //   '02.png',
  //   '03.png',
  //   '04.png',
  //   '05.png',
  //   '06.png',
  //   '07.png',
  //   '08.png'
  // ];

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
    'bungalo',
    'palace'
  ];


  var ApartmentsTypes = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
    palace: 'Дворец'
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

  window.util = {
    // Функция случайного числа из диапазона
    getRandomNumRange: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    // Функция возврата случайного элемента из массива
    getRandomElement: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    // Функция перестасовки массива Фишера - Йетса
    getShuffleArray: function (arr) {
      for (var i = arr.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[rand];
        arr[rand] = temp;
      }
      return arr;
    },

    // Функция возврата случайного количества строк из массива
    getRandomLengthArr: function (arr) {
      return arr.slice(window.util.etRandomNumRange(1, arr.length));
    },

    // Функция возращает каждый раз новый перетасованный массив Ф-Й
    getSortArr: function (arr) {
      for (var i = 0; i < arr.length; i++) {
        //
      }
      return arr.slice(window.util.datagetShuffleArray(arr));
    }
  };

  window.util = util;

  // Функция случайного числа из диапазона
  // var getRandomNumRange = function (min, max) {
  //   return Math.floor(Math.random() * (max - min)) + min;
  // };
  //
  // // Функция возврата случайного элемента из массива
  // var getRandomElement = function (arr) {
  //   return arr[Math.floor(Math.random() * arr.length)];
  // };
  //
  // // Функция перестасовки массива Фишера - Йетса
  // var getShuffleArray = function (arr) {
  //   for (var i = arr.length - 1; i > 0; i--) {
  //     var rand = Math.floor(Math.random() * (i + 1));
  //     var temp = arr[i];
  //     arr[i] = arr[rand];
  //     arr[rand] = temp;
  //   }
  //   return arr;
  // };
  //
  // // Функция возврата случайного количества строк из массива
  // var getRandomLengthArr = function (arr) {
  //   return arr.slice(getRandomNumRange(1, arr.length));
  // };
  //
  // // Функция возращает каждый раз новый перетасованный массив Ф-Й
  // var getSortArr = function (arr) {
  //   for (var i = 0; i < arr.length; i++) {
  //     //
  //   }
  //   return arr.slice(getShuffleArray(arr));
  // };
})();
// ....... Конец data.js
