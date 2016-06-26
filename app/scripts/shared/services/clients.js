'use strict';

/**
 * @ngdoc service
 * @name facturiSswApp.clients
 * @description
 * # clients
 * Factory in the facturiSswApp.
 */
angular.module('facturiSswApp')
    .service('$clients', ['$http', '$q', function ($http, $q) {
        var clientsList = [];
        var url = "http://localhost:8080/clients/";

        this.list = function () {
            return $http.get(url).then(function (result) {
                return result
            });
        };

        this.client = function (index) {
            return clientsList[index];
        };

        this.getById = function (id) {
            for (var i = 0, len = clientsList.length; i < len; i++) {
                if (clientsList[i]._id == id) {
                    return clientsList[i];
                }
            }
            return {banca: []};
        };

        this.push = function (client) {
            var deferred = $q.defer();

            $http.post(url, client).success(function (data) {
                if (data.success) {
                    clientsList.push(data.client);
                }

                deferred.resolve(data.success);
            });

            return deferred.promise;
        };

        this.update = function (client) {
            var deferred = $q.defer();

            $http.post(url + 'update', client).success(function (data) {
                if (data.success) {
                    clientsList.push(data.client);
                }

                deferred.resolve(data.success);
            });

            return deferred.promise;
        }
    }]);
