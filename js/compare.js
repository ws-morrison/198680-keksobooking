'use strict';

(function () {
  var FILTER_ELEMENT = 'features';
  var PRICE_LOW = 10000;
  var PRICE_HIGH = 50000;

  var filtersForm = document.querySelector('.map__filters');
  var houseType = filtersForm.querySelector('#housing-type');
  var housePrice = filtersForm.querySelector('#housing-price');
  var roomsNumber = filtersForm.querySelector('#housing-rooms');
  var guestsNumber = filtersForm.querySelector('#housing-guests');
  var features = filtersForm.querySelectorAll('input[name="features"]');


  var renderPinsAfterSetFilters = function () {
    window.map.closeCurrentOffer();

    window.map.removeAllPins();

    window.map.filtredOffers = setFilters();
    window.map.renderPins(window.map.filtredOffers.slice(0, window.map.PINS_LIMIT));
  };

  var filterChangeHandler = function (evt) {
    if (!evt.target.classList.contains('map__filter') &&
      evt.target.name !== FILTER_ELEMENT) {
      return;
    }
    window.debounce(renderPinsAfterSetFilters);

  };

  var bindFilters = function () {
    filtersForm.addEventListener('change', filterChangeHandler);
  };

  var setFilterValues = function (filterValue, itemValue) {
    return filterValue === 'any' || itemValue === filterValue;
  };

  var setFilterPrice = function (price) {
    var currentValue = housePrice.value;

    switch (currentValue) {
      case 'middle':
        return price >= PRICE_LOW && price < PRICE_HIGH;
      case 'low':
        return price < PRICE_LOW;
      case 'high':
        return price >= PRICE_HIGH;
      default:
        return true;
    }
  };

  var setFilterFeatures = function (filterFeatures, itemFeatures) {
    for (var i = 0; i < filterFeatures.length; i++) {
      if (itemFeatures.indexOf(filterFeatures[i]) === -1) {
        return false;
      }
    }

    return true;
  };

  var setFilters = function () {
    var houseFeatures = [].filter.call(features, function (item) {
      return item.checked;
    }).map(function (item) {
      return item.value;
    });

    return window.map.data.filter(function (item) {
      if (!setFilterValues(houseType.value, item.offer.type)) {
        return false;
      }
      if (!setFilterPrice(item.offer.price)) {
        return false;
      }
      if (!setFilterValues(roomsNumber.value, item.offer.rooms + '')) {
        return false;
      }
      if (!setFilterValues(guestsNumber.value, item.offer.guests + '')) {
        return false;
      }
      if (!setFilterFeatures(houseFeatures, item.offer.features)) {
        return false;
      }

      return true;
    });
  };


  window.setFilters = setFilters;
  bindFilters();
})();
