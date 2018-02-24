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

  //   ....... Kонец filters.js
})();
