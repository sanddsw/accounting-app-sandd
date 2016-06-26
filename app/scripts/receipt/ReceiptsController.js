'use strict';

/**
 * @ngdoc function
 * @name facturiSswApp.controller:AddBonCtrl
 * @description
 * # AddBonCtrl
 * Controller of the facturiSswApp
 */
angular.module('facturiSswApp')
  .controller('bonController', function ($bonuri, $scope) {
    $scope.bonDate = new Date();
    $scope.maxDate =new Date();
    $scope.maxDate = $scope.maxDate.setDate($scope.maxDate.getDate() + 1); // Used in form validation

    $scope.bonuri = $bonuri.list();

    $scope.saveBon = function () {
      var bon = {
        products: this.bonProducts,
        date: this.bonDate,
        amount: this.bonAmount
      };
      $bonuri.push(bon);
    };

    $scope.removeBon = function (index) {
      console.log("Should delete bon " + index);
    };
  });
