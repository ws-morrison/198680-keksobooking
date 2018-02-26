'use strict';
(function () {
  // //////// Файл filters.js

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

  // Перетаскивание
  // var parentMainPin = document.querySelector('.map__pins');
  // var coordLimits = {
  //   top: parentMainPin.offsetTop,
  //   right: parentMainPin.offsetWidth + parentMainPin.OffsetLeft - mapMainPin.offsetWidth,
  //   bottom: parentMainPin.offsetHeight + parentMainPin.offsetTop - mapMainPin.offsetHeight,
  //   left: parentMainPin.offsetLeft
  // }
  //
  // var MAIN_PIN_OFFSET_X = 50;
  // var MAIN_PIN_OFFSET_Y = 50;
  // var pinOffsetMinY = 150;
  // var pinOffsetMaxY = 500;


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

      shiftOffsetX = shiftOffsetX < 70 ? 70 : shiftOffsetX;
      shiftOffsetX = shiftOffsetX > 1130 ? 1130 : shiftOffsetX;

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


  // Передает клика если нажать на пин
  // mapMainPin.addEventListener('mouseup', function (evt) {
  //   console.log(evt.clientX, evt.clientY);
  // });

  // ....... Kонец filters.js
})();
