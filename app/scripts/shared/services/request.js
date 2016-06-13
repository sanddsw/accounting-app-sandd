'use strict';

/**
 * @ngdoc service
 * @name facturiSswApp.request
 * @description
 * # request
 * Service in the facturiSswApp.
 */
angular.module('facturiSswApp')
  .service('$request', ['$http', '$q', function ($http, $q) {
    var url = "http://localhost:8080/";

    return {
      post: function(route, data){
        return $q(function(resolve, reject) {
          $http.post(url + route, data).success(function(data){
            resolve(data);
          }).error(function (err) {
            resolve(err);
          })
        })
      }
    }

  }]);
