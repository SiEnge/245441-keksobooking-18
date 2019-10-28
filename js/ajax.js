'use strict';

(function () {

  window.load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
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
  }
})();

(function () {
  // 4. Если при загрузке данных произошла ошибка запроса, покажите соответствующее сообщение в блоке main, 
// используя блок #error из шаблона template

  var createElementError = function (text) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var element = errorTemplate.cloneNode(true);
    if (text) {
      element.querySelector('.error__message').innerHTML = text;
    }
    return element;
  };

  var showError = function (text) {
    var main = document.querySelector('main');
    main.appendChild(createElementError(text));
  };


  var onError = function (message) {
    showError();
    console.error(message);
  };
  
  var onSuccess = function (data) {
    window.offers = data;
  };
  
  window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);
  
})();







