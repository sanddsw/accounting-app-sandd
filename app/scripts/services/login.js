'use strict';

/**
 * @ngdoc service
 * @name facturiSswApp.login
 * @description
 * # login
 * Service in the facturiSswApp.
 */
angular.module('facturiSswApp')
  .factory('$login', ['$request', '$cookies', '$q', function ($request, $cookies, $q) {
    var loggedIn;

    return {
      isLogged: function() {
        if(angular.isObject(loggedIn)) return true;

        loggedIn = $cookies.get('login_data');
        return angular.isObject(loggedIn);
      },
      make: function (user) {
        return $q(function (resolve) {
          $request.post('users/login', user).then(function(data) {
            resolve(data);
            loggedIn = data;
            if(data.success) $cookies.put('login_data', data);
          })
        });
      }
    }
  }]);
