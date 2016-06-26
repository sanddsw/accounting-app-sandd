'use strict';

/**
 * @ngdoc service
 * @name facturiSswApp.facturi
 * @description
 * # facturi
 * Service in the facturiSswApp.
 */
angular.module('facturiSswApp')
    .service('$invoicesService', ['$http', function ($http) {
        var url = "http://localhost:8080/facturi/";

        this.list = function() {
            return $http.get(url)
        };

        this.download = function(id, language, user) {
            return $http.get(url + "get/" + user + "/" + language + "/" + id, {responseType:'blob'})
        };

        this.delete = function(id) {
            return $http.delete(url + id)
        };

        this.save = function(invoice) {
            invoice.buyer = invoice.buyer._id;
            return $http.post(url, invoice)
        };
    }]);
