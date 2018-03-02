'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var URL_DOWNLOAD = 'https://js.dump.academy/keksobooking/data';
  var TIMEOUT = 10000;

  var ErrorMessages = {
    PAGE_NOT_FOUND: 404,
    PAGE_SUCCESS: 200,
    SERVER_ERROR: 500
  };


  var setup = function (loadHandler, errorHandler) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case ErrorMessages.PAGE_SUCCESS:
          loadHandler(xhr.response);
          break;
        case ErrorMessages.PAGE_NOT_FOUND:
          errorHandler('Страница не найдена');
          break;
        case ErrorMessages.SERVER_ERROR:
          errorHandler('Внутренняя ошибка сервера');
          break;
        default:
          errorHandler('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });


    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };


  var upload = function (data, loadHandler, errorHandler) {
    var xhr = setup(loadHandler, errorHandler);

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  var load = function (loadHandler, errorHandler) {
    var xhr = setup(loadHandler, errorHandler);

    xhr.open('GET', URL_DOWNLOAD);
    xhr.send();
  };


  window.backend = {
    upload: upload,
    load: load
  };


})();
