'use strict';

/**
 * @ngdoc function
 * @name facturiSswApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the facturiSswApp
 */
angular.module('facturiSswApp')
  .controller('LoginController', function ($http, $loginService, $state) {
    var model = this;
    angular.extend(model, {
      isChecking: false,
      login: function() {
        model.isChecking = true;
        $loginService.make(model.user).then(function(data) {
          model.isChecking = false;
          if(data.success) {
            $state.go('main.home');
          }
        });
      }
    });
  });
