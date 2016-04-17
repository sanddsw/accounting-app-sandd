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
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/login");
    //
    // Now set up the states
    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('login', {
        url: "/login",
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl as vm'
      });


    
      // .state('state1.list', {
      //   url: "/list",
      //   templateUrl: "partials/state1.list.html",
      //   controller: function($scope) {
      //     $scope.items = ["A", "List", "Of", "Items"];
      //   }
      // })
      // .state('state2', {
      //   url: "/state2",
      //   templateUrl: "partials/state2.html"
      // })
      // .state('state2.list', {
      //   url: "/list",
      //   templateUrl: "partials/state2.list.html",
      //   controller: function($scope) {
      //     $scope.things = ["A", "Set", "Of", "Things"];
      //   }
      // });
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
  //     .when('/Login', {
  //       templateUrl: 'views/login.html',
  //       controller: 'loginCtrl as vm'
  //     });
  // }
  // ]);
