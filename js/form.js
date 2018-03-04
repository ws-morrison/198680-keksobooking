'use strict';
(function () {

  var NOT_FOR_GUESTS_OPTION = 0;
  var DEFAULT_ROOMS = '1';
  var MAX_ROOMS = 100;
  var PRICE_FLAT = 0;
  var PRICE_BUNGALO = 1000;
  var PRICE_HOUSE = 5000;
  var PRICE_PALACE = 10000;

  var validNoticeForm = document.querySelector('.notice__form');
  var formRooms = validNoticeForm.querySelector('#room_number');
  var formCapacity = validNoticeForm.querySelector('#capacity');
  var formTitle = validNoticeForm.querySelector('#title');
  var formPrice = validNoticeForm.querySelector('#price');
  var formType = validNoticeForm.querySelector('#type');
  var formTimeIn = validNoticeForm.querySelector('#timein');
  var formTimeOut = validNoticeForm.querySelector('#timeout');
  var capacityOptionElements = Array.from(formCapacity);


  var titleInvalidHandler = function () {
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

  var priceChangeHandler = function () {

    if (formType.value === 'flat') {
      formPrice.min = PRICE_FLAT;
    } else if (formType.value === 'bungalo') {
      formPrice.min = PRICE_BUNGALO;
    } else if (formType.value === 'house') {
      formPrice.min = PRICE_HOUSE;
    } else if (formType.value === 'palace') {
      formPrice.min = PRICE_PALACE;
    }
  };


  var priceInvalidHandler = function () {

    if (formPrice.validity.rangeOverflow) {
      formPrice.setCustomValidity('Цена не может быть больше ' + formPrice.max);
    } else if (formPrice.validity.rangeUnderflow) {
      formPrice.setCustomValidity('Цена данного типа жилья от ' + formPrice.min);
    } else if (formPrice.validity.valueMissing) {
      formPrice.setCustomValidity('Обязательное поле');
    } else {
      formPrice.setCustomValidity('');
    }
  };

  var guestChangeHandler = function () {
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

  var timeChangeHandler = function (evt) {
    if (evt.target === formTimeIn) {
      formTimeOut.value = formTimeIn.value;
    } else if (evt.target === formTimeOut) {
      formTimeIn.value = formTimeOut.value;
    }
  };

  getFormToDefault();

  formPrice.addEventListener('invalid', priceInvalidHandler);
  formTitle.addEventListener('invalid', titleInvalidHandler);
  formType.addEventListener('change', priceChangeHandler);
  formTimeIn.addEventListener('change', timeChangeHandler);
  formTimeOut.addEventListener('change', timeChangeHandler);
  formRooms.addEventListener('change', guestChangeHandler);

})();
