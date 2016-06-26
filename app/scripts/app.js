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
    'ngTouch',
    'pascalprecht.translate',
    'tmh.dynamicLocale'
  ])
  .constant('LOCALES', {
    'locales': {
      'ro_RO': 'Romanian',
      'en_US': 'English'
    },
    'preferredLocale': 'en_US'
  })
  .config(['$stateProvider','tmhDynamicLocaleProvider', '$translateProvider', function($stateProvider, tmhDynamicLocaleProvider, $translateProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('/bower_components/angular-i18n/angular-locale_{{locale}}.js');

    $translateProvider.useStaticFilesLoader({
      prefix: 'resources/locale-',// path to translations files
      suffix: '.json'// suffix, currently- extension of the translations
    });
    $translateProvider.preferredLanguage('en_US');// is applied on first load
    $translateProvider.useLocalStorage();



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
        controller: 'MainController',
        onEntry: ['$state', '$loginService', function ($state, $loginService) {
          if(!$loginService.isLogged()) {
            $state.go('login');
          }
        }]
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
            invoices: function ($invoicesService) {
                return $invoicesService.list().then(function (result) {
                    return result.data;
                });
            }
        }
      })
      .state('main.invoice_add', {
        url: "invoices/add",
        templateUrl: 'views/add_invoice.html',
        controller: 'AddInvoiceController as vm',
          resolve: {
              invoices: function ($invoicesService) {
                  return $invoicesService.list().then(function (result) {
                      return result.data;
                  });
              }
          }
      });
  }])

  .run(['$init', function($init) {
    $init();
  }]);

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
