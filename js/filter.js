'use strict';

(function () {
  var Price = {
    MIN: 0,
    MIDDLE_MIN: 10000,
    MIDDLE_MAX: 50000,
    MAX: Infinity
  };

  var PriceFilter = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  var filterElement = document.querySelector('.map__filters');
  window.filterElement = filterElement;

  var checkTypeFilter = function () {
    var filterSelect = filterElement.querySelector('#housing-type');
    return filterSelect.value;
  };

  var checkPriceFilter = function () {
    var filterSelect = filterElement.querySelector('#housing-price');
    switch (filterSelect.value) {
      case PriceFilter.LOW:
        return {type: filterSelect.value, min: Price.MIN, max: Price.MIDDLE_MIN};
      case PriceFilter.MIDDLE:
        return {type: filterSelect.value, min: Price.MIDDLE_MIN, max: Price.MIDDLE_MAX};
      case PriceFilter.HIGH:
        return {type: filterSelect.value, min: Price.MIDDLE_MAX, max: Price.MAX};
      default:
        return {type: filterSelect.value, min: Price.MIN, max: Price.MAX};
    }
  };

  var checkRoomsFilter = function () {
    return filterElement.querySelector('#housing-rooms').value;
  };

  var checkQuestsFilter = function () {
    return filterElement.querySelector('#housing-guests').value;
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

  var onChangeFilter = function () {
    window.pin.display();
  };


  window.filter = {

    activate: function () {
      window.data.loadOffers();

      var filterElements = window.filterElement.querySelectorAll('.map__filter');

      filterElements.forEach(function (element) {
        element.addEventListener('change', onChangeFilter);
      });

      var filterFeatureElement = window.filterElement.querySelector('.map__features');
      var filterFeatureElements = filterFeatureElement.querySelectorAll('.map__checkbox');

      filterFeatureElements.forEach(function (element) {
        element.addEventListener('change', onChangeFilter);
      });
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
