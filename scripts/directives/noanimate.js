'use strict';

/**
 * @ngdoc directive
 * @name accountingApp.directive:noAnimate
 * @description
 * # noAnimate
 */
angular.module('accountingApp')
  .directive('noAnimate', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the noAnimate directive');
      }
    };
  });
