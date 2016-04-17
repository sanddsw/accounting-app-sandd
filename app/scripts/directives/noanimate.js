'use strict';

/**
 * @ngdoc directive
 * @name facturiSswApp.directive:noAnimate
 * @description
 * # noAnimate
 */
angular.module('facturiSswApp')
  .directive('noAnimate', ['$animate',
    function($animate) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          $animate.enabled(false, element);
          scope.$watch(function() {
            $animate.enabled(false, element)
          })
        }
      };
    }
  ]);
