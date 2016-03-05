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
      .when('/Facturi', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl as facturi'
        //resolve: {
        //  postPromise: dbPromise('videos')
        //}
      })
      .when('/Adauga', {
        templateUrl: 'views/add.html',
        controller: 'AddCtrl as vm',
        resolve: {
          postPromise: ['$clients', function($clients) {
            return $clients('init');
          }]
        }
      })
      .when('/AddBon', {
        templateUrl: 'views/add_bon.html',
        controller: 'AddBonCtrl',
        resolve: {
          postPromise: ['$bonuri', function ($bonuri) {
            return $bonuri.init();
          }]
        }
      });
  }
  ]);
