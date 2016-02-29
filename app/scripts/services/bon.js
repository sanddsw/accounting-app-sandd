'use strict';

/**
 * @ngdoc service
 * @name facturiSswApp.bonuri
 * @description
 * # bonuri
 * Factory in the facturiSswApp.
 */
angular.module('facturiSswApp')
  .service('$bonuri',['$http', function ($http) {

    var url = "http://localhost:8080/bonuri/";
    //var url = "http://facturi-ssw.cloudapp.net/bonuri/";
    var bonuri = [];

    this.init = function(callback) {
      if(bonuri.length > 0) return;
      return $http.get(url).success(function(data) {
        bonuri = data;
        callback();
      });
    };

    this.list = function() {
      return bonuri;
    };

    this.bon = function(index) {
      return bonuri[index];
    };

    this.getById = function(id) {
      for(var i = 0, len = bonuri.length; i < len; i++) {
        if(bonuri[i]._id == id) {
          return bonuri[i];
        }
      }
      return undefined;
    };

    this.push = function(bon) {
      $http.post(url, bon).success(function(data) {
        if(data._id) {
          bonuri.push(data);
        }
      });
    };

    this.update = function(bon) {
      $http.post(url, bon).success(function(data) {
        if(data._id) {
          bonuri.push(data);
        }
      });
    };
  }]);
