'use strict';
(function () {

  var NOT_FOR_GUESTS_OPTION = 0;
  var DEFAULT_ROOMS = '1';
  var MAX_ROOMS = 100;

  var validNoticeForm = document.querySelector('.notice__form');
  var formRooms = validNoticeForm.querySelector('#room_number');
  var formCapacity = validNoticeForm.querySelector('#capacity');
  var formTitle = validNoticeForm.querySelector('#title');
  var formPrice = validNoticeForm.querySelector('#price');
  var formType = validNoticeForm.querySelector('#type');
  var formTimeIn = validNoticeForm.querySelector('#timein');
  var formTimeOut = validNoticeForm.querySelector('#timeout');
  // var inputs = validNoticeForm.querySelectorAll('input');
  var capacityOptionElements = Array.from(formCapacity);


  var flatPrice = 0;
  var bungaloPrice = 1000;
  var housePrice = 5000;
  var palacePrice = 10000;


  var getValidTitle = function () {
    if (formTitle.validity.tooShort) {
      formTitle.setCustomValidity('Заголовок слишком короткий. Длина заголовка должна быть от 30 до 100 символов');
    } else if (formTitle.validity.tooLong) {
      formTitle.setCustomValidity('Заголовок слишком длинный. Длина заголовка должна быть от 30 до 100 символов');
    } else if (formTitle.validity.valueMissing) {
      formTitle.setCustomValidity('Обязательное поле');
    }
  };


  var getValidPrice = function () {
    if (formPrice.validity.rangeOverflow) {
      formPrice.setCustomValidity('Цена не может быть больше 1 000 000');
    } else if (formPrice.validity.valueMissing) {
      formPrice.setCustomValidity('Обязательное поле');
    } else {
      formPrice.setCustomValidity('');
    }
  };


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


  var getChangePrice = function () {
    if (formType.value === 'flat') {

      formPrice.min = flatPrice;
    } else if (formType.value === 'bungalo') {

      formPrice.min = bungaloPrice;

    } else if (formType.value === 'house') {

      formPrice.min = housePrice;
    } else if (formType.value === 'palace') {

      formPrice.min = palacePrice;
    }
  };


  var getSyncTimeIn = function (evt) {
    if (evt.target === formTimeIn) {
      formTimeOut.value = formTimeIn.value;
    } else if (evt.target === formTimeOut) {
      formTimeIn.value = formTimeOut.value;
    }
  };

  getFormToDefault();

  formTitle.addEventListener('invalid', getValidTitle);
  formPrice.addEventListener('invalid', getValidPrice);
  formPrice.addEventListener('invalid', getChangePrice);
  formTimeIn.addEventListener('change', getSyncTimeIn);
  formTimeOut.addEventListener('change', getSyncTimeIn);
  formRooms.addEventListener('change', getGuestOptions);
  formType.addEventListener('change', getChangePrice);


})();
