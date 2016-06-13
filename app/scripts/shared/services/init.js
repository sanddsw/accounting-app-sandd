'use strict';

/**
 * @ngdoc service
 * @name facturiSswApp.init
 * @description
 * # init
 * Service in the facturiSswApp.
 */
angular.module('facturiSswApp')
  .service('$init', ['$loginService', '$state', '$rootScope', function ($loginService, $state, $rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return function() {
      $state.go(($loginService.isLogged()) ? 'main.home' : 'login');
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){
        if(!$loginService.isLogged()) {
          event.preventDefault();
          $state.go('login')
        }
      })
    }
  }]);
