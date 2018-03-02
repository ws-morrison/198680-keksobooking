'use strict';
(function () {
  // //////// Файл filters.js

  // Прячет пины. Добавляет всем пинам класс .hidden
  // Модуль активного и неактивного состояний

  var mapLayer = document.querySelector('.map');
  var mapOverlay = document.querySelector('.map__pinsoverlay');
  var mapMainPin = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var formAddress = document.querySelector('#address');
  var formPrice = document.querySelector('#price');
  var formTitle = document.querySelector('#title');
  var formFieldset = noticeForm.querySelectorAll('fieldset');
  var formReset = noticeForm.querySelector('.form__reset');


  var pinX = mapMainPin.clientWidth;
  var pinY = mapMainPin.clientHeight;


  var mainPinOffsetX = mapMainPin.offsetLeft;
  var mainPinOffsetY = mapMainPin.offsetTop;


  var hidePins = function () {
    var hideButtons = document.querySelectorAll('.map__pin');

    for (var i = 0; i < hideButtons.length; i++) {
      if (hideButtons[i].classList.contains('map__pin--main')) {
        continue;
      }
      hideButtons[i].classList.add('hidden');
    }
    return hideButtons;
  };

  var showPins = function () {
    var hideButtons = document.querySelectorAll('.map__pin');

    for (var i = 0; i < hideButtons.length; i++) {
      hideButtons[i].classList.remove('hidden');
    }
    return hideButtons;
  };

  // Добавляет затемнение для карточки, фильтра, пинов
  var fadeOn = function () {
    noticeForm.classList.add('notice__form--disabled');
    mapLayer.classList.add('map--faded');
    mapMainPin.classList.remove('hidden');
    hidePins();
  };
  // fadeOn();

  // Убирает затемнение для карточки, фильтра, пинов
  var fadeOff = function () {
    showPins();
    mapLayer.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    getDisabledInputOff();
  };

  // Задает или убирает аттрибут disabled форме
  var getDisabledInputOn = function () {
    for (var i = 0; i < formFieldset.length; i++) {
      formFieldset[i].setAttribute('disabled', true);
    }
  };

  var getDisabledInputOff = function () {
    for (var i = 0; i < formFieldset.length; i++) {
      formFieldset[i].removeAttribute('disabled', false);
    }
  };


  // Перетаскивание
  mapMainPin.addEventListener('mousedown', function (evt) {
    fadeOff();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var shiftOffsetX = mapMainPin.offsetLeft + shift.x;
      var shiftOffsetY = mapMainPin.offsetTop + shift.y;


      shiftOffsetY = shiftOffsetY < 150 ? 150 : shiftOffsetY;
      shiftOffsetY = shiftOffsetY > 650 ? 650 : shiftOffsetY;

      shiftOffsetX = shiftOffsetX < 0 ? 0 : shiftOffsetX;
      shiftOffsetX = shiftOffsetX > mapOverlay.clientWidth ? mapOverlay.clientWidth : shiftOffsetX;

      mapMainPin.style.top = shiftOffsetY + 'px';
      mapMainPin.style.left = shiftOffsetX + 'px';
    };


    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  // Записывает координаты в Адрес
  var setAdress = function () {
    formAddress.value = Math.round((mapMainPin.offsetLeft + (pinX / 2))) + ', ' + Math.round((mapMainPin.offsetTop + pinY));
  };


  // Сброс активного состояния
  var getFormReset = function () {

    formAddress.value = null;
    formTitle.value = null;
    formPrice.value = null;

    fadeOn();
    getDisabledInputOn();
    window.map.closeCurrentOffer();


    // Сбрасывает координаты главного пина
    var setMainPinOnStart = function () {
      mapMainPin.style.left = mainPinOffsetX + 'px';
      mapMainPin.style.top = mainPinOffsetY + 'px';
    };
    setMainPinOnStart();
  };


  fadeOn();

  document.addEventListener('DOMContentLoaded', getDisabledInputOn);
  mapMainPin.addEventListener('mouseup', fadeOff);
  formReset.addEventListener('click', getFormReset);
  mapMainPin.addEventListener('mousemove', setAdress);
  // ....... Kонец filters.js

})();
