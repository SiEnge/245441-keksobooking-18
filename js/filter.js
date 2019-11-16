'use strict';

(function () {
  var PRICE_MIDDLE_MIN = 10000;
  var PRICE_MIDDLE_MAX = 50000;
  var PRICE_MIN = 0;
  var PRICE_MAX = Infinity;

  var filterElement = document.querySelector('.map__filters');
  window.filterElement = filterElement;

  var checkTypeFilter = function () {
    var filterSelect = filterElement.querySelector('#housing-type');
    return filterSelect.value;
  };

  var checkPriceFilter = function () {
    var filterSelect = filterElement.querySelector('#housing-price');
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
    var filterSelect = filterElement.querySelector('#housing-rooms');
    return filterSelect.value;
  };

  var checkQuestsFilter = function () {
    var filterSelect = filterElement.querySelector('#housing-guests');
    return filterSelect.value;
  };

  var checkFeatureFilter = function () {
    var filterSelect = filterElement.querySelector('#housing-features');
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

  var getFilter = function () {
    return {
      type: checkTypeFilter(),
      price: checkPriceFilter(),
      rooms: checkRoomsFilter(),
      guests: checkQuestsFilter(),
      feature: checkFeatureFilter()
    };
  };

  var isTypeFilter = function (type, filter) {
    return type === filter || filter === 'any';
  };

  var isPriceFilter = function (price, filter) {
    return (price >= +filter.min && price <= +filter.max) || filter.type === 'any';
  };

  var isRoomsFilter = function (rooms, filter) {
    return rooms === +filter || filter === 'any';
  };

  var isQuestsFilter = function (guests, filter) {
    return guests === +filter || filter === 'any';
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


  window.filter = {
    activate: function () {
      window.data.loadOffers();

      var filterElements = filterElement.querySelectorAll('.map__filter');
      for (var i = 0; i < filterElements.length; i++) {
        filterElements[i].addEventListener('change', window.pin.display);
      }

      var filterFeatureElement = filterElement.querySelector('.map__features');
      var filterFeatureElements = filterFeatureElement.querySelectorAll('.map__checkbox');

      for (var j = 0; j < filterFeatureElements.length; j++) {
        filterFeatureElements[j].addEventListener('change', window.pin.display);
      }
    },
    disable: function () {
      window.util.disabledForm(filterElement);
      filterElement.reset();
    },
    getOffers: function () {
      var filter = getFilter();
      return window.offers.filter(function (offer) {
        return isTypeFilter(offer.offer.type, filter.type) &&
        isPriceFilter(offer.offer.price, filter.price) &&
        isRoomsFilter(offer.offer.rooms, filter.rooms) &&
        isQuestsFilter(offer.offer.guests, filter.guests) &&
        isFeaturesFilter(offer.offer.features, filter.feature);
      });
    }
  };
})();
