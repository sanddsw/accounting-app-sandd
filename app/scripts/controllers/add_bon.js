'use strict';

/**
 * @ngdoc function
 * @name facturiSswApp.controller:AddBonCtrl
 * @description
 * # AddBonCtrl
 * Controller of the facturiSswApp
 */
angular.module('facturiSswApp')
  .controller('AddBonCtrl', function ($bonuri, $scope) {
    $scope.bonDate = new Date();

    $bonuri.init(function () {
      $scope.bonuri = $bonuri.list();
    });

    $scope.saveBon = function () {
      var bon = {
        products: this.bonProducts,
        date: this.bonDate,
        amount: this.bonAmount
      };
      $bonuri.push(bon);
    }
  });
