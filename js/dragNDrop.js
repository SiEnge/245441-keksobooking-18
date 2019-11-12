'use strict';
(function () {
  // var pinMain = document.querySelector('.map__pin--main');
  // var addressAdForm = document.querySelector('#address');


  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // координаты точки с которой начали перемещать
    var startCoords = new Coordinate(evt.clientX, evt.clientY);

    // при перемещении мыши обновлять смещение относительно первоначальной точки
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      //определение смещения метки
      var shift = new Coordinate(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY);

      // фиксирование новых координат
      // var startCoords = new Coordinate(moveEvt.clientX, moveEvt.clientY, 130, 630);

      // startCoords.setX = moveEvt.clientX;
      // startCoords.setY = moveEvt.clientY;
      startCoords = new Coordinate(moveEvt.clientX, moveEvt.clientY);

      // var pinMainCoords = new Coordinate(pinMain.offsetLeft - shift.x, pinMain.offsetTop - shift.y);
      // window.Coordinate = function (x, y, minX, maxX, minY, maxY) {
      var pinMainCoords = new Coordinate('', '', window.COORD_PIN_MAIN.MIN_X, window.COORD_PIN_MAIN.MAX_X, window.COORD_PIN_MAIN.MIN_Y, window.COORD_PIN_MAIN.MAX_Y);
      pinMainCoords.setX(pinMain.offsetLeft - shift.x);
      pinMainCoords.setY(pinMain.offsetTop - shift.y);

      // Ограничим область установки пина - перенести в отдельную функцию проверку
        // if (pinMainCoords.x > MAP_MAX_X) {
        //   pinMainCoords.x = MAP_MAX_X;
        // }
        // if (pinMainCoords.y > window.COORD_PIN_MAIN.MAX_Y) {
        //   pinMainCoords.y = window.COORD_PIN_MAIN.MAX_Y;
        // }
        // if (pinMainCoords.x < MAP_MIN_X) {
        //   pinMainCoords.x = MAP_MIN_X;
        // }
        // if (pinMainCoords.y < window.COORD_PIN_MAIN.MIN_Y;) {
        //   pinMainCoords.y = window.COORD_PIN_MAIN.MIN_Y;;
        // }

      // обновление координат Пина
      // 4.3. Для удобства пользователей значение Y-координаты адреса должно быть 
      // ограничено интервалом от 130 до 630. Значение X-координаты адреса должно 
      // быть ограничено размерами блока, в котором перемещается метка.

      pinMain.style.top = pinMainCoords.y + 'px';
      pinMain.style.left = pinMainCoords.x + 'px';

      // обновление поля с Адресом
      var coord = positionPinMain();
      displayCoordinatePinMain(coord.x, coord.y);

    };

    // при отпускании кнопки мыши отключение обработчиков
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    // обработчики передвижения и отпускания
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();


// В этом задании мы решим задачу перемещения главной метки (.map__pin--main) по карте.

// 1. Опишите полный цикл перемещения для метки, добавив обработчики событий mousedown, 
// mousemove и mouseup на метку.

// 2. Обработчики mousemove и mouseup должны запускать логику изменения положения метки: 
// в нём должны вычисляться новые координаты метки на основании смещения, применяться через 
// стили к элементу и записываться в поле адреса (с поправкой на то, что в адрес записываются 
//  координаты острого конца).

// 3. Учтите, расчёт координат метки и их запись в поле адреса должна дублироваться и 
// в обработчике mouseup, потому что в некоторых случаях пользователь может нажать мышь на метке, 
// но никуда её не переместить. Напишите универсальную функцию расчёта координат, чтобы избавиться 
// от дублирования кода.

// 4. Ещё один момент касается ограничения перемещения: не забудьте сделать так, чтобы метку 
// невозможно было переместить за пределы карты (см. пункт 3.4).

// 5. Вспомните, в прошлом задании вы уже добавляли обработчик на событие mousedown, который 
// переводил страницу в активный режим. Теперь, когда у вас есть синхронизация с координатами, 
// вам нужно выбрать стратегию — использовать несколько обработчиков или один со сложной логикой.