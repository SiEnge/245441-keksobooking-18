'use strict';

(function () {
  var XhrStatusCode = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  var getTextError = function (statusCode, statusText) {
    switch (statusCode) {
      case XhrStatusCode.BAD_REQUEST:
        return 'Неверный запрос';
      case XhrStatusCode.UNAUTHORIZED:
        return 'Пользователь не авторизован';
      case XhrStatusCode.NOT_FOUND:
        return 'Ничего не найдено';
      case XhrStatusCode.SERVER_ERROR:
        return 'Oшибка сервера';
      default:
        return 'Cтатус ответа: ' + statusCode + ' ' + statusText;
    }
  };

  window.ajax = {
    load: function (url, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === XhrStatusCode.SUCCESS) {
          onSuccess(xhr.response);
        } else {
          var textError = getTextError(xhr.status, xhr.statusText);
          onError(textError);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000; // 10s

      xhr.open('GET', url);
      xhr.send();
    },

    upload: function (data, url, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === XhrStatusCode.SUCCESS) {
          onSuccess(xhr.response);
        } else {
          var textError = getTextError(xhr.status, xhr.statusText);
          onError(textError);
        }
      });

      xhr.open('POST', url);
      xhr.send(data);
    }
  };
})();
