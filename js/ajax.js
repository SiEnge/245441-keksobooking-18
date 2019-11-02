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
  };
})();


(function () {
  var URL = 'https://js.dump.academy/keksobooking2';
  
  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
      // onSuccess(xhr.response);
    });
    
    xhr.open('POST', URL);
    xhr.send(data);
  };
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


// 1. Доработайте обработчик отправки формы, который вы делали в задании «Личный проект: доверяй, но проверяй», 
// так чтобы он отменял действие формы по умолчанию и отправлял данные формы на сервер посредством 
// XHR https://js.dump.academy/keksobooking.

// 2. После успешной передачи данных на сервер верните страницу в неактивное состояние:
// - очистите заполненные поля;
// - удалите метки похожих объявлений и карточку активного объявления;
// - верните метку адреса в исходное положение, не забыв скорректировать координаты, отображаемые в поле «Адрес»;

// 3. Покажите сообщение об успешной отправке формы. Разметка сообщения находится блоке #success внутри 
// шаблона template. Сообщение должно исчезать по нажатию на клавишу Esc и по клику на произвольную область экрана.

// 4. Если при отправке данных произошла ошибка запроса, покажите соответствующее сообщение. Разметку сообщения, 
// которая находится в блоке #error в шаблоне template, нужно разместить в main. Сообщение должно исчезать после 
// нажатия на кнопку .error__button, по нажатию на клавишу Esc и по клику на произвольную область экрана.







