'use strict';

/**
 * @ngdoc service
 * @name facturiSswApp.bonuri
 * @description
 * # bonuri
 * Factory in the facturiSswApp.
 */
angular.module('facturiSswApp')
  .factory('$bonuri',['$http', '$q', function ($http, $q) {
    var bonuri = [],
      $_ = {
        init: function() {
          if(bonuri.length > 0) return;
          return $http.get('http://facturi-ssw.cloudapp.net/bonuri/').success(function(data) {
            bonuri = data;
          });
        },
        list: function() {
          return bonuri;
        },
        bon: function(index) {
          return bonuri[index];
        },
        getById: function(id) {
          for(var i = 0, len = bonuri.length; i < len; i++) {
            if(bonuri[i]._id == id) {
              return bonuri[i];
            }
          }
          return {banca: []};
        },
        push: function(bon) {
          var deferred = $q.defer();

          $http.post('http://facturi-ssw.cloudapp.net/bonuri/', bon).success(function(data) {
            if(data.success) {
              bonuri.push(data.bon);
            }

            deferred.resolve(data.success);
          });

          return deferred.promise;
        },
        update: function(bon) {
          var deferred = $q.defer();

          $http.post('http://facturi-ssw.cloudapp.net/bonuri/update', bon).success(function(data) {
            if(data.success) {
              bonuri.push(data.bon);
            }

            deferred.resolve(data.success);
          });

          return deferred.promise;
        }
      };

    // Public API here
    return function(type, options) {
      return $_[type](options);
    }
  }]);
