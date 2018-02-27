'use strict';

(function () {
  var SERVER_URL = '';
  var TIMEOUT = 10000;

  var setup = function (loadHandler, errorHandler) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          loadHandler(xhr.response);
          break;
        case 404:
          errorHandler('Страница не найдена');
          break;
        case 500:
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
  }


  var upload = function (data, loadHandler, errorHandler) {
    var xhr = setup(loadHandler, errorHandler);

    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  }

  var load = function (loadHandler, errorHandler) {
    var xhr = setup(loadHandler, errorHandler);

    xhr.open('GET', SERVER_URL + '/data');
    xhr.send();
  }

  window.backend = {
    upload,
    load
  };
})();
