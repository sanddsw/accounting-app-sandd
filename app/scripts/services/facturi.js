'use strict';

/**
 * @ngdoc service
 * @name facturiSswApp.facturi
 * @description
 * # facturi
 * Service in the facturiSswApp.
 */
angular.module('facturiSswApp')
  .service('$facturi', ['$http', function ($http) {
    var url = "http://localhost:8080/facturi/";
    var facturi = [];

    this.init = function(callback) {
      if(facturi.length > 0) return;
      return $http.get(url).success(function(data) {
        facturi = data;
        if (callback) {
          callback(data);
        }
      });
    };

    this.list = function() {
      return facturi;
    };

    this.factura = function(index) {
      return facturi[index];
    };

    this.getById = function(id) {
      for(var i = 0, len = facturi.length; i < len; i++) {
        if(facturi[i]._id == id) {
          return facturi[i];
        }
      }
      return undefined;
    };

    this.push = function(factura, callbackWin) {
      $http.post(url, factura).success(function(data) {
        if(data._id) {
          facturi.push(data);
          if(callbackWin) {
            callbackWin(data)
          }
        }
      });
    };

    this.update = function(factura) {
      $http.post(url, factura).success(function(data) {
        if(data._id) {
          facturi.push(data);
        }
      });
    };
  }]);
