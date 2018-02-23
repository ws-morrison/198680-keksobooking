'use strict';
(function () {


  var OFFER_COUNT = 8;

  var ESC_KEYCODE = 27;

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

  var noticeForm = document.querySelector('.notice__form');

  window.data = {
    makeRandomOffers: function () {
      var offersResult = [];
      var shuffledAvatars = window.util.getShuffleArray(AVATARS);
      var shuffledTitles = window.util.getShuffleArray(TITLES);
      for (var i = 0; i < OFFER_COUNT; i++) {
        var randomLocationX = window.util.getRandomNumRange(300, 900);
        var randomLocationY = window.util.getRandomNumRange(100, 500);
        offersResult.push({
          'author': {
            'avatar': 'img/avatars/user' + shuffledAvatars[i],
          },
          'offer': {
            'title': shuffledTitles[i],
            'address': randomLocationX + ', ' + randomLocationY,
            'price': window.util.getRandomNumRange(offerPrice.min, offerPrice.max),
            'type': window.util.getRandomElement(TYPES),
            'rooms': window.util.getRandomNumRange(offerRooms.min, offerRooms.max),
            'guests': window.util.getRandomNumRange(offerGuests.min, offerGuests.max),
            'checkin': window.util.getRandomElement(TIMES_CHECK_IN),
            'checkout': window.util.getRandomElement(TIMES_CHECK_OUT),
            'features': window.util.getRandomLengthArr(FEATURES),
            'description': '',
            'photos': window.util.getSortArr(PHOTOS)
          },
          'location': {
            'x': randomLocationX,
            'y': randomLocationY,
          }
        });
      }
      return offersResult;
    },
  };

  window.data = data;
})();
