'use strict';

// //////// Файл fade.js

// Прячет пины. Добавляет всем пинам класс .hidden
// Модуль активного и неактивного состояний
var hideButtons = document.querySelectorAll('.map__pin');
var mapLayer = document.querySelector('.map');
var mapMainPin = document.querySelector('.map__pin--main');
var noticeForm = document.querySelector('.notice__form');
var getFadedPins = function () {
  for (var i = 0; i < hideButtons.length; i++) {
    hideButtons[i].classList.add('hidden');
  }
  return hideButtons;
};


// Добавляет затемнение для карточки, фильтра, пинов
var fadeOn = function () {
  noticeForm.classList.add('notice__form--disabled');
  getFadedPins();
  mapLayer.classList.add('map--faded');
  mapMainPin.classList.remove('hidden');
};
fadeOn();


var removeFadedPins = function () {
  for (var i = 0; i < hideButtons.length; i++) {
    hideButtons[i].classList.remove('hidden');
  }
  return hideButtons;
};


// Убирает затемнение для карточки, фильтра, пинов
var fadeOff = function () {
  removeFadedPins();
  mapLayer.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');
  getDisabledInputOff();
};


// Задает или убирает аттрибут disabled форме
var formFieldset = noticeForm.querySelectorAll('fieldset');
var getDisabledInputOn = function () {
  for (var i = 0; i < formFieldset.length; i++) {
    formFieldset[i].setAttribute('disabled', true);
  }
};
document.addEventListener('DOMContentLoaded', getDisabledInputOn);

var getDisabledInputOff = function () {
  for (var i = 0; i < formFieldset.length; i++) {
    formFieldset[i].removeAttribute('disabled', false);
  }
};


// Убирает затемнение
mapMainPin.addEventListener('mouseup', fadeOff);

// Сброс активного состояния
var formReset = noticeForm.querySelector('.form__reset');
var getFormReset = function () {
  fadeOn();
  getDisabledInputOn();
};
formReset.addEventListener('click', getFormReset);


// ///////// Файл form.js
// Валидация формы
var NOT_FOR_GUESTS_OPTION = 0;
var DEFAULT_ROOMS = '1';
var MAX_ROOMS = 100;

var validNoticeForm = document.querySelector('.notice__form');
var formRooms = validNoticeForm.querySelector('#room_number');
var formCapacity = validNoticeForm.querySelector('#capacity');
var formTitle = validNoticeForm.querySelector('#title');
var formPrice = validNoticeForm.querySelector('#price');
var formType = validNoticeForm.querySelector('#type');
var capacityOptionElements = Array.from(formCapacity);


var getValidTitle = function () {
  if (formTitle.validity.tooShort) {
    formTitle.setCustomValidity('Заголовок слишком короткий. Длина заголовка должна быть от 30 до 100 символов');
  } else if (formTitle.validity.tooLong) {
    formTitle.setCustomValidity('Заголовок слишком длинный. Длина заголовка должна быть от 30 до 100 символов');
  } else if (formTitle.validity.valueMissing) {
    formTitle.setCustomValidity('Обязательное поле');
  } else {
    formTitle.setCustomValidity('');
  }
};
formTitle.addEventListener('invalid', getValidTitle);


var getValidPrice = function () {
  if (formPrice.validity.rangeOverflow) {
    formPrice.setCustomValidity('Цена не может быть больше 1 000 000');
  } else if (formPrice.validity.valueMissing) {
    formPrice.setCustomValidity('Обязательное поле');
  } else {
    formPrice.setCustomValidity('');
  }
};
formPrice.addEventListener('invalid', getValidPrice);


var getGuestOptions = function () {
  var selectedOptionValue = parseInt(formRooms.value, 10);

  var getOptionDisabled = function (optionsArray, booleanValue) {
    optionsArray.forEach(function (option) {
      option.disabled = booleanValue;
    });
  };
  getOptionDisabled(capacityOptionElements, true);

  if (selectedOptionValue === MAX_ROOMS) {
    capacityOptionElements[NOT_FOR_GUESTS_OPTION].disabled = false;
    capacityOptionElements[NOT_FOR_GUESTS_OPTION].selected = true;
  } else {
    var capacityOptions = capacityOptionElements.slice(1);
    capacityOptions.length = selectedOptionValue;
    getOptionDisabled(capacityOptions, false);
    capacityOptions.forEach(function (option) {
      option.selected = true;
    });
  }
};


var getFormToDefault = function () {
  formRooms.value = DEFAULT_ROOMS;
  formCapacity.placeholder = DEFAULT_ROOMS;
  formCapacity.value = DEFAULT_ROOMS;

  capacityOptionElements.forEach(function (item) {
    if (!item.selected) {
      item.disabled = true;
    }
  });
};


formRooms.addEventListener('change', getGuestOptions);
getFormToDefault();

var flatPrice = 0;
var bungaloPrice = 1000;
var housePrice = 5000;
var palacePrice = 10000;

var getChangePrice = function () {

  if (formType.value === 'flat') {

    formPrice.min = flatPrice;
    formPrice.setCustomValidity('Для данного типа жилья цена не может быть ниже ' + flatPrice + ' \u20bd');
  } else if (formType.value === 'bungalo') {

    formPrice.min = bungaloPrice;
    formPrice.setCustomValidity('Для данного типа жилья цена не может быть ниже ' + bungaloPrice + ' \u20bd');

  } else if (formType.value === 'house') {

    formPrice.min = housePrice;
    formPrice.setCustomValidity('Для данного типа жилья цена не может быть ниже ' + housePrice + ' \u20bd');
  } else if (formType.value === 'palace') {

    formPrice.min = palacePrice;
    formPrice.setCustomValidity('Для данного типа жилья цена не может быть ниже ' + palacePrice + ' \u20bd');
  }
};

formType.addEventListener('change', getChangePrice);
formPrice.addEventListener('invalid', getChangePrice);


var formTimeIn = validNoticeForm.querySelector('#timein');
var formTimeOut = validNoticeForm.querySelector('#timeout');


var getSyncTimeIn = function (evt) {
  if (evt.target === formTimeIn) {
    formTimeOut.value = formTimeIn.value;
  } else if (evt.target === formTimeOut) {
    formTimeIn.value = formTimeOut.value;
  }
};
formTimeIn.addEventListener('change', getSyncTimeIn);