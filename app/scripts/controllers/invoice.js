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
      $facturi.delete($scope.facturi[index]._id, function(){
        $scope.facturi.splice(index, 1);
      });
    };

    $scope.downloadFactura = function (index) {
      $facturi.download($scope.facturi[index]._id, "en", "doru", function(blob) {
        var url = (window.URL || window.webkitURL).createObjectURL(blob);
        window.open(url, '_blank');
      });
    };

    $scope.newInvoice = function () {
      $location.path('/Facturi/Adauga')
    }
  });
