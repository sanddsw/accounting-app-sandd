'use strict';

/**
 * @ngdoc service
 * @name facturiSswApp.init
 * @description
 * # init
 * Service in the facturiSswApp.
 */
angular.module('facturiSswApp')
  .service('$init', ['$login', '$state', '$rootScope', function ($login, $state, $rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return function() {
      $state.go(($login.isLogged()) ? 'home' : 'login');
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){
        if(!$login.isLogged()) $state.go('login');
      })
    }
  }]);
