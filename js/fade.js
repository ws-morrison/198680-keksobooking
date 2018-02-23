'use strict';

// Прячет пины. Добавляет всем пинам класс .hidden
// Модуль активного и неактивного состояний
(function () {

  var hideButtons = document.querySelectorAll('.map__pin');
  var mapMainPin = document.querySelector('.map__pin--main');

  var getFadedPins = function () {
    for (var i = 0; i < hideButtons.length; i++) {
      hideButtons[i].classList.add('hidden');
    }
    return hideButtons;
  };


  // var data.noticeForm = document.querySelector('.notice__form');

  // Добавляет затемнение для карточки, фильтра, пинов
  var fadedMainMap = document.querySelector('.map--faded');
  var fadedNoticeForm = document.querySelector('.notice__form');

  var fadeOn = function () {
    fadedNoticeForm.classList.add('notice__form--disabled');
    getFadedPins();
    fadedMainMap.classList.add('map--faded');
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
    fadedMainMap.classList.remove('map--faded');
    fadedNoticeForm.classList.remove('notice__form--disabled');
    getDisabledInputOff();
  };


  // Задает или убирает аттрибут disabled форме
  var formFieldset = fadedNoticeForm.querySelectorAll('fieldset');
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
  var formReset = fadedNoticeForm.querySelector('.form__reset');
  var getFormReset = function () {
    closeCurrentOffer();
    fadeOn();
    getDisabledInputOn();
  };
  formReset.addEventListener('click', getFormReset);

  // window.fade = fade;
})();
