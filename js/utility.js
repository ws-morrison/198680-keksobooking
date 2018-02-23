'use strict';

// Функция случайного числа из диапазона
(function () {
  window.util = {
    getRandomNumRange: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getRandomElement: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    getShuffleArray: function (arr) {
      for (var i = arr.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[rand];
        arr[rand] = temp;
      }
      return arr;
    },

    getRandomLengthArr: function (arr) {
      return arr.slice(window.util.getRandomNumRange(1, arr.length));
    },
    getSortArr: function (arr) {
      for (var i = 0; i < arr.length; i++) {
        //
      }
      return arr.slice(window.util.getShuffleArray(arr));
    },

  };

  window.util = util;
})();


// var getRandomNumRange = function (min, max) {
//   return Math.floor(Math.random() * (max - min)) + min;
// };
//
// // Функция возврата случайного элемента из массива
// var getRandomElement = function (arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// };
//
// // Функция перестасовки массива Фишера - Йетса
// var getShuffleArray = function (arr) {
//   for (var i = arr.length - 1; i > 0; i--) {
//     var rand = Math.floor(Math.random() * (i + 1));
//     var temp = arr[i];
//     arr[i] = arr[rand];
//     arr[rand] = temp;
//   }
//   return arr;
// };
//
// // Функция возврата случайного количества строк из массива
// var getRandomLengthArr = function (arr) {
//   return arr.slice(getRandomNumRange(1, arr.length));
// };
//
// // Функция возращает каждый раз новый перетасованный массив Ф-Й
// var getSortArr = function (arr) {
//   for (var i = 0; i < arr.length; i++) {
//     //
//   }
//   return arr.slice(getShuffleArray(arr));
// };
// })();
