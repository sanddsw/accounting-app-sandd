'use strict';

/**
 * @ngdoc overview
 * @name facturiSswApp
 * @description
 * # facturiSswApp
 *
 * Main module of the application.
 */
angular
  .module('facturiSswApp', [
    'foundation',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/Facturi/Adauga', {
        templateUrl: 'views/add_invoice.html',
        controller: 'invoiceAddController as vm',
        resolve: {
          postPromise: ['$clients', function($clients) {
            return $clients('init');
          }]
        }
      })
      .when('/Facturi', {
        templateUrl: 'views/invoices.html',
        controller: 'invoiceController',
        resolve: {
          postPromise: ['$facturi', function($facturi) {
            return $facturi.init();
          }]
        }
      })
      .when('/Bon', {
        templateUrl: 'views/bon.html',
        controller: 'bonController',
        resolve: {
          postPromise: ['$bonuri', function ($bonuri) {
            return $bonuri.init();
          }]
        }
      });
  }
  ]);
