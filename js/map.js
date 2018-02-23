// 'use strict';
//
// var OFFER_COUNT = 8;
//
// var ESC_KEYCODE = 27;
//
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
//
// var TITLES = [
//   'Большая уютная квартира',
//   'Маленькая неуютная квартира',
//   'Огромный прекрасный дворец',
//   'Маленький ужасный дворец',
//   'Красивый гостевой домик',
//   'Некрасивый негостеприимный домик',
//   'Уютное бунгало далеко от моря',
//   'Неуютное бунгало по колено в воде'
// ];
//
// var TYPES = [
//   'flat',
//   'house',
//   'bungalo',
//   'palace'
// ];
//
//
// var ApartmentsTypes = {
//   flat: 'Квартира',
//   house: 'Дом',
//   bungalo: 'Бунгало',
//   palace: 'Дворец'
// };
//
// var TIMES_CHECK_IN = [
//   '12:00',
//   '13:00',
//   '14:00'
// ];
//
// var TIMES_CHECK_OUT = [
//   '12:00',
//   '13:00',
//   '14:00'
// ];
//
// var FEATURES = [
//   'wifi',
//   'dishwasher',
//   'parking',
//   'washer',
//   'elevator',
//   'conditioner'
// ];
//
// var PHOTOS = [
//   'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
//   'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
//   'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
// ];
//
// var offerPrice = {
//   min: 1000,
//   max: 1000000,
// };
//
// var offerRooms = {
//   min: 1,
//   max: 5,
// };
//
// var offerGuests = {
//   min: 1,
//   max: 12,
// };
//
//
// // Функция случайного числа из диапазона
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
//
// var makeRandomOffers = function () {
//   var offersResult = [];
//   var shuffledAvatars = getShuffleArray(AVATARS);
//   var shuffledTitles = getShuffleArray(TITLES);
//
//   for (var i = 0; i < OFFER_COUNT; i++) {
//
//     var randomLocationX = getRandomNumRange(300, 900);
//     var randomLocationY = getRandomNumRange(100, 500);
//
//     offersResult.push({
//       'author': {
//         'avatar': 'img/avatars/user' + shuffledAvatars[i],
//       },
//       'offer': {
//         'title': shuffledTitles[i],
//         'address': randomLocationX + ', ' + randomLocationY,
//         'price': getRandomNumRange(offerPrice.min, offerPrice.max),
//         'type': getRandomElement(TYPES),
//         'rooms': getRandomNumRange(offerRooms.min, offerRooms.max),
//         'guests': getRandomNumRange(offerGuests.min, offerGuests.max),
//         'checkin': getRandomElement(TIMES_CHECK_IN),
//         'checkout': getRandomElement(TIMES_CHECK_OUT),
//         'features': getRandomLengthArr(FEATURES),
//         'description': '',
//         'photos': getSortArr(PHOTOS)
//       },
//       'location': {
//         'x': randomLocationX,
//         'y': randomLocationY,
//       }
//     });
//   }
//   return offersResult;
// };
// var allOffers = makeRandomOffers();
//
//
// // Рендер пинов
// var getPin = function (offer, id) {
//   var pinElement = mapTemplate.querySelector('.map__pin').cloneNode(true);
//   pinElement.style.left = offer.location.x + 55 + 'px';
//   pinElement.style.top = offer.location.y + 55 + 'px';
//   pinElement.dataset.index = id;
//   pinElement.querySelector('img').src = offer.author.avatar;
//   return pinElement;
// };
//
//
// var onPinClick = function (evt) {
//   var pinElement = null;
//   pinElement = evt.target;
//   if (evt.target.tagName === 'IMG') {
//     pinElement = evt.target.parentNode;
//   }
//   renderOffer(allOffers[pinElement.dataset.index]);
// };
//
//
// // Рендерит и показывает карточку по клику на пин
// var mainMap = document.querySelector('.map');
// var mapTemplate = document.querySelector('template').content;
// var renderPins = function (offersArray) {
//
//   var docFragmnet = document.createDocumentFragment();
//   offersArray.forEach(function (offer, index) {
//     var newPin = getPin(offer, index);
//     newPin.addEventListener('click', onPinClick);
//     docFragmnet.appendChild(newPin);
//   });
//   mainMap.appendChild(docFragmnet);
// };
// renderPins(allOffers);
//
//
// // Добавляет иконки Features
// var getFeaturesList = function (featuresArray) {
//   var featuresList = '';
//   for (var i = 0; i < featuresArray.length; i++) {
//     featuresList = '<li class="feature feature--' + featuresArray[i] + '"></li>' + featuresList;
//   }
//   return featuresList;
// };
//
//
// // Добавляет фотографии PHOTOS
// var getPhotosList = function (photosArray) {
//   var photosItem = '';
//   for (var i = 0; i < photosArray.length; i++) {
//     photosItem = '<li>' + '<img src =' + photosArray[i] + ' width = 60px, height = 60px style = "margin: 5px"></li>' + photosItem;
//   }
//   return photosItem;
// };
//
//
// // Создает и клонирует карточку
// var createCardOffer = function (offerObject) {
//   var cardElement = mapTemplate.querySelector('.map__card').cloneNode(true);
//   cardElement.querySelector('h3').textContent = offerObject.offer.title;
//   cardElement.querySelector('h3+p').textContent = offerObject.offer.address;
//   cardElement.querySelector('.popup__price').textContent = offerObject.offer.price + ' \u00A5/ночь ';
//   cardElement.querySelector('h4').textContent = ApartmentsTypes[offerObject.offer.type];
//   cardElement.querySelector('h4+p').textContent = 'Комнат: ' + offerObject.offer.rooms + ' для ' + offerObject.offer.guests + '  гостей';
//   cardElement.querySelector('p:nth-of-type(4)').textContent = 'Заезд: ' + offerObject.offer.checkin + ', выезд: ' + offerObject.offer.checkout;
//   cardElement.querySelector('.popup__features').innerHTML = getFeaturesList(offerObject.offer.features);
//   cardElement.querySelector('p').textContent = offerObject.offer.description;
//   cardElement.querySelector('.popup__pictures').innerHTML = getPhotosList(offerObject.offer.photos);
//   cardElement.querySelector('.popup__avatar').src = offerObject.author.avatar;
//   return cardElement;
// };
//
//
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
//
//
// var closeCurrentOffer = function () {
//   var closeCard = document.querySelector('.map__card');
//   closeCard.classList.add('hidden');
// };
// var onCloseButtonClick = function (evt) {
//   if (evt.target.classList.contains('popup__close')) {
//     closeCurrentOffer();
//   }
// };
// var onCloseButtonKeydown = function (evt) {
//   if (evt.keyCode === ESC_KEYCODE) {
//     closeCurrentOffer();
//     document.removeEventListener('keydown', closeCurrentOffer);
//   }
// };
//
// document.addEventListener('click', onCloseButtonClick);
// document.addEventListener('keydown', onCloseButtonKeydown);
// document.removeEventListener('keydown', closeCurrentOffer);
//
//
// // Прячет пины. Добавляет всем пинам класс .hidden
// // Модуль активного и неактивного состояний
// var hideButtons = document.querySelectorAll('.map__pin');
// var mapMainPin = document.querySelector('.map__pin--main');
//
// var getFadedPins = function () {
//   for (var i = 0; i < hideButtons.length; i++) {
//     hideButtons[i].classList.add('hidden');
//   }
//   return hideButtons;
// };
//
//
// var noticeForm = document.querySelector('.notice__form');
//
// // Добавляет затемнение для карточки, фильтра, пинов
// var fadeOn = function () {
//   noticeForm.classList.add('notice__form--disabled');
//   getFadedPins();
//   mainMap.classList.add('map--faded');
//   mapMainPin.classList.remove('hidden');
// };
// fadeOn();
//
//
// var removeFadedPins = function () {
//   for (var i = 0; i < hideButtons.length; i++) {
//     hideButtons[i].classList.remove('hidden');
//   }
//   return hideButtons;
// };
//
//
// // Убирает затемнение для карточки, фильтра, пинов
// var fadeOff = function () {
//   removeFadedPins();
//   mainMap.classList.remove('map--faded');
//   noticeForm.classList.remove('notice__form--disabled');
//   getDisabledInputOff();
// };
//
//
// // Задает или убирает аттрибут disabled форме
// var formFieldset = noticeForm.querySelectorAll('fieldset');
// var getDisabledInputOn = function () {
//   for (var i = 0; i < formFieldset.length; i++) {
//     formFieldset[i].setAttribute('disabled', true);
//   }
// };
// document.addEventListener('DOMContentLoaded', getDisabledInputOn);
//
// var getDisabledInputOff = function () {
//   for (var i = 0; i < formFieldset.length; i++) {
//     formFieldset[i].removeAttribute('disabled', false);
//   }
// };
//
//
// // Убирает затемнение
// mapMainPin.addEventListener('mouseup', fadeOff);
//
// // Сброс активного состояния
// var formReset = noticeForm.querySelector('.form__reset');
// var getFormReset = function () {
//   fadeOn();
//   getDisabledInputOn();
// };
// formReset.addEventListener('click', getFormReset);
//
// // Конец модуля
//
// // Валидация формы
// var NOT_FOR_GUESTS_OPTION = 0;
// var DEFAULT_ROOMS = '1';
// var MAX_ROOMS = 100;
//
//
// var formRooms = noticeForm.querySelector('#room_number');
// var formCapacity = noticeForm.querySelector('#capacity');
// var formTitle = noticeForm.querySelector('#title');
// var formPrice = noticeForm.querySelector('#price');
// var formType = noticeForm.querySelector('#type');
// var capacityOptionElements = Array.from(formCapacity);
//
//
// var getValidTitle = function () {
//   if (formTitle.validity.tooShort) {
//     formTitle.setCustomValidity('Заголовок слишком короткий. Длина заголовка должна быть от 30 до 100 символов');
//   } else if (formTitle.validity.tooLong) {
//     formTitle.setCustomValidity('Заголовок слишком длинный. Длина заголовка должна быть от 30 до 100 символов');
//   } else if (formTitle.validity.valueMissing) {
//     formTitle.setCustomValidity('Обязательное поле');
//   } else {
//     formTitle.setCustomValidity('');
//   }
// };
// formTitle.addEventListener('invalid', getValidTitle);
//
//
// var getValidPrice = function () {
//   if (formPrice.validity.rangeOverflow) {
//     formPrice.setCustomValidity('Цена не может быть больше 1 000 000');
//   } else if (formPrice.validity.valueMissing) {
//     formPrice.setCustomValidity('Обязательное поле');
//   } else {
//     formPrice.setCustomValidity('');
//   }
// };
// formPrice.addEventListener('invalid', getValidPrice);
//
//
// var getGuestOptions = function () {
//   var selectedOptionValue = parseInt(formRooms.value, 10);
//
//   var getOptionDisabled = function (optionsArray, booleanValue) {
//     optionsArray.forEach(function (option) {
//       option.disabled = booleanValue;
//     });
//   };
//   getOptionDisabled(capacityOptionElements, true);
//
//   if (selectedOptionValue === MAX_ROOMS) {
//     capacityOptionElements[NOT_FOR_GUESTS_OPTION].disabled = false;
//     capacityOptionElements[NOT_FOR_GUESTS_OPTION].selected = true;
//   } else {
//     var capacityOptions = capacityOptionElements.slice(1);
//     capacityOptions.length = selectedOptionValue;
//     getOptionDisabled(capacityOptions, false);
//     capacityOptions.forEach(function (option) {
//       option.selected = true;
//     });
//   }
// };
//
//
// var getFormToDefault = function () {
//   formRooms.value = DEFAULT_ROOMS;
//   formCapacity.placeholder = DEFAULT_ROOMS;
//   formCapacity.value = DEFAULT_ROOMS;
//
//   capacityOptionElements.forEach(function (item) {
//     if (!item.selected) {
//       item.disabled = true;
//     }
//   });
// };
//
//
// formRooms.addEventListener('change', getGuestOptions);
// getFormToDefault();
//
// var flatPrice = 0;
// var bungaloPrice = 1000;
// var housePrice = 5000;
// var palacePrice = 10000;
//
// var getChangePrice = function () {
//
//   if (formType.value === 'flat') {
//
//     formPrice.min = flatPrice;
//     formPrice.setCustomValidity('Для данного типа жилья цена не может быть ниже ' + flatPrice + ' \u20bd');
//   } else if (formType.value === 'bungalo') {
//
//     formPrice.min = bungaloPrice;
//     formPrice.setCustomValidity('Для данного типа жилья цена не может быть ниже ' + bungaloPrice + ' \u20bd');
//
//   } else if (formType.value === 'house') {
//
//     formPrice.min = housePrice;
//     formPrice.setCustomValidity('Для данного типа жилья цена не может быть ниже ' + housePrice + ' \u20bd');
//   } else if (formType.value === 'palace') {
//
//     formPrice.min = palacePrice;
//     formPrice.setCustomValidity('Для данного типа жилья цена не может быть ниже ' + palacePrice + ' \u20bd');
//   }
// };
//
// formType.addEventListener('change', getChangePrice);
// formPrice.addEventListener('invalid', getChangePrice);
//
//
// var formTimeIn = noticeForm.querySelector('#timein');
// var formTimeOut = noticeForm.querySelector('#timeout');
//
//
// var getSyncTimeIn = function (evt) {
//   if (evt.target === formTimeIn) {
//     formTimeOut.value = formTimeIn.value;
//   } else if (evt.target === formTimeOut) {
//     formTimeIn.value = formTimeOut.value;
//   }
// };
// formTimeIn.addEventListener('change', getSyncTimeIn);
