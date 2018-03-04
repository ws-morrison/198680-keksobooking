'use strict';
(function () {


  var mapLayer = document.querySelector('.map');
  var mapOverlay = document.querySelector('.map__pinsoverlay');
  var mapMainPin = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var formType = noticeForm.querySelector('#type');
  var formAddress = noticeForm.querySelector('#address');
  var formPrice = noticeForm.querySelector('#price');
  var formTitle = noticeForm.querySelector('#title');
  var formRooms = noticeForm.querySelector('#room_number');
  var formCapacity = noticeForm.querySelector('#capacity');
  var formTimeIn = noticeForm.querySelector('#timein');
  var formTimeOut = noticeForm.querySelector('#timeout');
  var formText = noticeForm.querySelector('#description');
  var formFieldset = document.querySelectorAll('fieldset');
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


  var fadeClickHandler = function () {

    noticeForm.classList.add('notice__form--disabled');
    mapLayer.classList.add('map--faded');
    mapMainPin.classList.remove('hidden');

    hidePins();
  };

  var fadeRemoveClickHandler = function () {
    showPins();
    mapLayer.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    getDisabledInputOff();
  };


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


  mapMainPin.addEventListener('mousedown', function (evt) {
    fadeRemoveClickHandler();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
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


    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

  });

  var setAdress = function () {
    var setPinX = Math.round((mapMainPin.offsetLeft + (pinX / 2)));
    var setPinY = Math.round((mapMainPin.offsetTop + pinY));
    formAddress.value = setPinX + ', ' + setPinY;
  };


  var getFormReset = function () {

    fadeClickHandler();
    getDisabledInputOn();
    window.map.closeCurrentOffer();

    formAddress.value = null;
    formTitle.value = null;
    formPrice.value = null;
    formText.value = null;
    formType.value = 'flat';
    formTimeIn.value = '12:00';
    formTimeOut.value = '12:00';
    formRooms.value = '1';
    formCapacity.value = '3';

    var setMainPinOnStart = function () {
      mapMainPin.style.left = mainPinOffsetX + 'px';
      mapMainPin.style.top = mainPinOffsetY + 'px';
    };
    setMainPinOnStart();
    setAdress();
  };


  fadeClickHandler();

  document.addEventListener('DOMContentLoaded', getDisabledInputOn);
  mapMainPin.addEventListener('mouseup', fadeRemoveClickHandler);
  formReset.addEventListener('click', getFormReset);
  mapMainPin.addEventListener('mousemove', setAdress);


})();
