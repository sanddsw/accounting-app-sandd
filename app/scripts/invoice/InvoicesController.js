'use strict';

/**
 * @ngdoc function
 * @name facturiSswApp.controller:AddBonCtrl
 * @description
 * # AddBonCtrl
 * Controller of the facturiSswApp
 */
angular.module('facturiSswApp')
  .controller('InvoiceController', function ($invoicesService, $scope, $location, $state, invoices) {
    $scope.facturi = invoices;

    $scope.removeFactura = function (invoice) {
      $invoicesService.delete(invoice._id).then(function(){
        $scope.facturi.splice($scope.facturi.indexOf(invoice), 1);
      });
    };

    $scope.downloadFactura = function (invoice) {
      $invoicesService.download(invoice._id, "en", "doru").then(function(res) {
        var url = (window.URL || window.webkitURL).createObjectURL(res.data);
        window.open(url, '_blank');
      });
    };

    $scope.newInvoice = function () {
      $state.go('main.invoice_add');
    };
  });
