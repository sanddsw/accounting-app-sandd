'use strict';

/**
 * @ngdoc service
 * @name facturiSswApp.clients
 * @description
 * # clients
 * Factory in the facturiSswApp.
 */
angular.module('facturiSswApp')
  .factory('$clients',['$http', '$q', function ($http, $q) {
    // Service logic
    // ...
    var clientsList = [],
      $_ = {
        init: function() {
          if(clientsList.length > 0) return;
          return $http.get('http://facturi-ssw.cloudapp.net/clients/').success(function(data) {
            clientsList = data;
          });
        },
        list: function() {
          return clientsList;
        },
        client: function(index) {
          return clientsList[index];
        },
        getById: function(id) {
          for(var i = 0, len = clientsList.length; i < len; i++) {
            if(clientsList[i]._id == id) {
              return clientsList[i];
            }
          }
          return {banca: []};
        },
        push: function(client) {
          var deferred = $q.defer();

          $http.post('http://facturi-ssw.cloudapp.net/clients/', client).success(function(data) {
            if(data.success) {
              clientsList.push(data.client);
            }

            deferred.resolve(data.success);
          });

          return deferred.promise;
        },
        update: function(client) {
          var deferred = $q.defer();

          $http.post('http://facturi-ssw.cloudapp.net/clients/update', client).success(function(data) {
            if(data.success) {
              clientsList.push(data.client);
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
