'use strict';

(function () {
  var PRICE_MIDDLE_MIN = 10000;
  var PRICE_MIDDLE_MAX = 50000;
  var PRICE_MIN = 0;
  var PRICE_MAX = Infinity;

  window.filterForm = document.querySelector('.map__filters');

  var checkTypeFilter = function () {
    var filterSelect = filterForm.querySelector('#housing-type');
    return filterSelect.value;
  };

  var checkPriceFilter = function () {
    var filterSelect = filterForm.querySelector('#housing-price');
    switch (filterSelect.value) {
      case 'low':
        return {type: filterSelect.value, min: PRICE_MIN, max: PRICE_MIDDLE_MIN};
      case 'middle':
        return {type: filterSelect.value, min: PRICE_MIDDLE_MIN, max: PRICE_MIDDLE_MAX};
      case 'high':
        return {type: filterSelect.value, min: PRICE_MIDDLE_MAX, max: PRICE_MAX};
      default:
        return {type: filterSelect.value, min: PRICE_MIN, max: PRICE_MAX};
    }
  };

  var checkRoomsFilter = function () {
    var filterSelect = filterForm.querySelector('#housing-rooms');
    return filterSelect.value;
  };

  var checkQuestsFilter = function () {
    var filterSelect = filterForm.querySelector('#housing-guests');
    return filterSelect.value;
  };

  var checkFeatureFilter = function () {
    var filterSelect = filterForm.querySelector('#housing-features');
    var features = filterSelect.querySelectorAll('.map__checkbox');
    var featureFilter = [];
    for (var i = 0; i < features.length; i++) {
      var feature = features[i];
      if (feature.checked === true) {
        featureFilter.push(feature.value);
      }
    }
    return featureFilter;
  };

  // var getOffersFilter = window.debounce(function () {
  //   var filter = checkFilter();

  //   var filteredOffers = offers.filter(function (offer) {
  //     return isTypeFilter(offer.offer.type, filter.type) &&
  //     isPriceFilter(offer.offer.price, filter.price) &&
  //     isRoomsFilter(offer.offer.rooms, filter.rooms) &&
  //     isQuestsFilter(offer.offer.guests, filter.guests) &&
  //     isFeaturesFilter(offer.offer.features, filter.feature);
  //   });

  //   return filteredOffers;
  // });

  var checkFilter = function () {
    var currentFilter = {
      type: checkTypeFilter(), 
      price: checkPriceFilter(),
      rooms: checkRoomsFilter(),
      guests: checkQuestsFilter(),
      feature: checkFeatureFilter()
    };
    return currentFilter;
  };

  var isTypeFilter = function (type, filter) {
    return type === filter || filter === 'any';
    //   return true;
    // }
    // return false;
  };

  var isRoomsFilter = function (rooms, filter) {
    return rooms === +filter || filter === 'any';
    //   return true;
    // }
    // return false;
  };

  var isQuestsFilter = function (guests, filter) {
    return guests === +filter || filter === 'any';
    //   return true;
    // }
    // return false;
  };

  var isPriceFilter = function (price, filter) {
    return (price >= +filter.min && price <= +filter.max) || filter.type === 'any';
    //   return true;
    // }
    // return false;
  };

  var isFeaturesFilter = function (features, filter) {
    if (filter.length === 0) {
      return true;
    }

    for (var i = 0; i < filter.length; i++) {
      if (!features.includes(filter[i])) {
        return false;
      }
    }

    return true;
  };




  window.getOffersFilter = function () {
    var filter = checkFilter();

    var filteredOffers = offers.filter(function (offer) {
      return isTypeFilter(offer.offer.type, filter.type) &&
      isPriceFilter(offer.offer.price, filter.price) &&
      isRoomsFilter(offer.offer.rooms, filter.rooms) &&
      isQuestsFilter(offer.offer.guests, filter.guests) &&
      isFeaturesFilter(offer.offer.features, filter.feature);
    });

    return filteredOffers;
  };

  // - Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form;
  // Все <input> и <select> формы .ad-form заблокированы с помощью атрибута disabled, добавленного на них или на их родительские блоки fieldset;
  window.disableFilterForm = function () {
    disabledForm(filterForm);
    filterForm.reset();
  };


  window.activateFilterForm = function () {
    // запрос данных по объявлениям, если все хорошо, то отрисовать пины, если нет - то ошибку
    loadOffers();


    var filters = filterForm.querySelectorAll('.map__filter');
    for (var i = 0; i < filters.length; i++) {
      var filter = filters[i];
      filter.addEventListener('change', displayPins);
    }

    var featureWrap = filterForm.querySelector('.map__features');
    var features = featureWrap.querySelectorAll('.map__checkbox');

    for (var i = 0; i < features.length; i++) {
      var feature = features[i];
      feature.addEventListener('change', displayPins);
    }
  };

 

})();




 



  

  //   // по фильтрам отобрать объявления в которых присутсвует выбранные фильтры
  //   // как фильтровать? например выбрано Квартира -- следовательно нужно показать только квартиры
  //   // если указана цена?
  //   // если указано две комнаты - то из выбранных показать именно две комнаты
  //   // если указано количество гостей = то из выбранных с нужным колчиество гостей
  //   // выбранные преимущества - если указано только вайфай, то показать объяаления в которых он есть
  //   // собрать и вернуть массив[!] с объявлениями и с порядковым номером основного массива

  // };

// В этом задании мы научимся фильтровать данные, полученные с сервера. В проекте предусмотрена отдельная форма с различными фильтрами. 
// Мы разберём ее чуть позже. Начнём тренировки с малого: запрограммируем фильтр по типу жилья и количеству отображаемых меток. 
// С фильтром по типу жилья сложностей возникнуть не должно ‐ задача достаточно тривиальная.

// Отдельного пояснения требует реализация фильтра по количеству отображаемых меток. С сервера приходит достаточно много объявлений. 
// Их может и 10, и 20, и даже больше. Если всегда выводить все объявления, то пользователю среди них будет трудно ориентироваться. 
// Поэтому мы должны позаботиться, чтобы на карте не отображалось больше 5 меток.

// Задача
// 1. Выводить на карту не более 5 меток. Установка фильтра по количеству должна происходить сразу после получения данных с сервера;
// 2. Запрограммировать фильтр «Тип жилья». Помните, независимо от того сколько объявлений соответствует фильтру «Тип жилья» на карте 
// не должно отображаться больше 5 объявлений.


// 1. Доработайте модуль, отрисовывающий метки, таким образом, чтобы отрисованные на карте метки можно было фильтровать 
// с помощью фильтров, расположенных в блоке .map__filters. После фильтрации должны показываться те метки из набора данных, 
// которые подходят под выбранные фильтры. Метки, отрисованные до этого нужно убрать. Все выбранные фильтры применяются вместе: 
// один фильтр не отменяет другие, выбранные до него. Например, после выбора типа жилья можно указать диапазон стоимости и дополнения 
// и в этом случае, на карте должны показываться только те метки, которые подходят под все условия. Как в изначальном состоянии, 
// так и при изменении фильтра, на карте должно показываться не более 5 меток, независимо от выбранного фильтра.
// 2. Воспользуйтесь приёмом «устранение дребезга» для того, чтобы сделать так, чтобы при переключении фильтра обновление списка элементов, 
// подходящих под фильтры, происходило не чаще, чем один раз в полсекунды.

// настройка фильтра
// 1. на каждый выпадающий список поставить обработчик на изменение - change
// 2. при изменении запускать код проверки фильтра, т.е выявить параметры фильтра
// 3. далее удалить и отрисовать новые пины

// Продумать принцип фильтрации объявлений