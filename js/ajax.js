'use strict';

(function () {
  var getTextError = function (status, statusText) {
    switch (status) {
      case 400:
        return 'Неверный запрос';
      case 401:
        return 'Пользователь не авторизован';
      case 404:
        return 'Ничего не найдено';
      case 500:
        return 'Oшибка сервера';
      default:
        return 'Cтатус ответа: ' + status + ' ' + statusText;
    }
  };

  window.ajax = {
    load: function (url, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
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
        if (xhr.status === 200) {
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
