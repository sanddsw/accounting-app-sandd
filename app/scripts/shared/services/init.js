'use strict';

/**
 * @ngdoc service
 * @name facturiSswApp.init
 * @description
 * # init
 * Service in the facturiSswApp.
 */
angular.module('facturiSswApp')
  .service('$init', ['$loginService', '$state', '$rootScope', function ($loginService, $state) {
    return function() {
      $state.go(($loginService.isLogged()) ? 'main.home' : 'login');
    }
  }]);
