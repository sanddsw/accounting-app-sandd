'use strict';

/**
 * @ngdoc function
 * @name facturiSswApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the facturiSswApp
 */
angular.module('facturiSswApp')
  .controller('MainController', function ($scope, $state) {

   $scope.goToInvoices = function() {
     $state.go('main.invoices');
   }
  });
