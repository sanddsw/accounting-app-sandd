'use strict';

/**
 * @ngdoc function
 * @name facturiSswApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the facturiSswApp
 */
angular.module('facturiSswApp')
  .controller('LoginCtrl', function ($http, $login, $state) {
    var vm = this;
    angular.extend(vm, {
      isChecking: false,
      login: function() {
        vm.isChecking = true;
        $login.make(vm.user).then(function(data) {
          vm.isChecking = false;
          if(data.success) {
            $state.go('home');
          }
        })
      }
    });
  });
