'use strict';
(function () {
  var pinMain = document.querySelector('.map__pin--main');
  var addressAdForm = document.querySelector('#address');

  pinMain.addEventListener('mousedown', function (evt) {
  	evt.preventDefault();

  	// координаты точки с которой начали перемещать
  	var startCoords = {
		  x: evt.clientX,
		  y: evt.clientY
		};

		// при перемещении мыши обновлять смещение относительно первоначальной точки
		var onMouseMove = function (moveEvt) {
	    moveEvt.preventDefault();

	    var shift = {
	      x: startCoords.x - moveEvt.clientX,
	      y: startCoords.y - moveEvt.clientY
	    };

	    startCoords = {
	      x: moveEvt.clientX,
	      y: moveEvt.clientY
	    };

	    // обновление координат Пина
	    pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
	    pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

	    // обновление поля с Адресом
	    addressAdForm.value = (pinMain.offsetTop - shift.y) + ', ' + (pinMain.offsetLeft - shift.x);
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
// 	координаты острого конца).

// 3. Учтите, расчёт координат метки и их запись в поле адреса должна дублироваться и 
// в обработчике mouseup, потому что в некоторых случаях пользователь может нажать мышь на метке, 
// но никуда её не переместить. Напишите универсальную функцию расчёта координат, чтобы избавиться 
// от дублирования кода.

// 4. Ещё один момент касается ограничения перемещения: не забудьте сделать так, чтобы метку 
// невозможно было переместить за пределы карты (см. пункт 3.4).

// 5. Вспомните, в прошлом задании вы уже добавляли обработчик на событие mousedown, который 
// переводил страницу в активный режим. Теперь, когда у вас есть синхронизация с координатами, 
// вам нужно выбрать стратегию — использовать несколько обработчиков или один со сложной логикой.