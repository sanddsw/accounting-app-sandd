'use strict';

/**
 * @ngdoc function
 * @name facturiSswApp.controller:AddBonCtrl
 * @description
 * # AddBonCtrl
 * Controller of the facturiSswApp
 */
angular.module('facturiSswApp')
  .controller('invoiceController', function ($facturi, $scope, $location) {
    $scope.facturi = $facturi.list();

    $scope.removeFactura = function (index) {
      console.log("Should delete factura " + index)
    };

    $scope.newInvoice = function () {
      $location.path('/Facturi/Adauga')
    }
  });
