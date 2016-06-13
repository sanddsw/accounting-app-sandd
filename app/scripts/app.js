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
    'ui.router',
    'ngSanitize',
    'ngTouch'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to login
    // $urlRouterProvider.otherwise("/login");

    // Now set up the states
    $stateProvider
      .state('login', {
        url: "login",
        templateUrl: 'views/login.html',
        controller: 'LoginController as model'
      })
      .state('main', {
        abstract: true,
        url: "/",
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .state('main.home', {
        url: "home",
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      })
      .state('main.invoices', {
        url: "invoices",
        templateUrl: 'views/invoices.html',
        controller: 'InvoiceController',
        resolve: {
          postPromise: ['$invoicesService', function($facturi) {
            return $facturi.init();
          }]
        }
      })
      .state('main.facturi.adauga', {
        url: "invoices/add",
        templateUrl: 'views/add_invoice.html',
        controller: 'AddInvoiceController as vm'
      });
  }])
  .run(['$init', function($init) {
    $init();
  }]);



  // .config(['$routeProvider', function($routeProvider) {
  //   $routeProvider
  //     .when('/Facturi/Adauga', {
  //       templateUrl: 'views/add_invoice.html',
  //       controller: 'invoiceAddController as vm',
  //       resolve: {
  //         postPromise: ['$clients', function($clients) {
  //           return $clients('init');
  //         }]
  //       }
  //     })
  //     .when('/Facturi', {
  //       templateUrl: 'views/invoices.html',
  //       controller: 'invoiceController',
  //       resolve: {
  //         postPromise: ['$facturi', function($facturi) {
  //           return $facturi.init();
  //         }]
  //       }
  //     })
  //     .when('/Bon', {
  //       templateUrl: 'views/bon.html',
  //       controller: 'bonController',
  //       resolve: {
  //         postPromise: ['$bonuri', function ($bonuri) {
  //           return $bonuri.init();
  //         }]
  //       }
  //     })
  // }
  // ]);
