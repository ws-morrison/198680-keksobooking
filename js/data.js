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

  window.data = {
    makeRandomOffers: function () {
      var offersResult = [];
      var shuffledAvatars = util.getShuffleArray(AVATARS);
      var shuffledTitles = util.getShuffleArray(TITLES);
      for (var i = 0; i < OFFER_COUNT; i++) {
        var randomLocationX = util.getRandomNumRange(300, 900);
        var randomLocationY = util.getRandomNumRange(100, 500);
        offersResult.push({
          'author': {
            'avatar': 'img/avatars/user' + shuffledAvatars[i],
          },
          'offer': {
            'title': shuffledTitles[i],
            'address': randomLocationX + ', ' + randomLocationY,
            'price': util.getRandomNumRange(offerPrice.min, offerPrice.max),
            'type': util.getRandomElement(TYPES),
            'rooms': util.getRandomNumRange(offerRooms.min, offerRooms.max),
            'guests': util.getRandomNumRange(offerGuests.min, offerGuests.max),
            'checkin': util.getRandomElement(TIMES_CHECK_IN),
            'checkout': util.getRandomElement(TIMES_CHECK_OUT),
            'features': util.getRandomLengthArr(FEATURES),
            'description': '',
            'photos': util.getSortArr(PHOTOS)
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
