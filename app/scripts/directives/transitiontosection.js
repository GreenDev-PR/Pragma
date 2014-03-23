'use strict';

angular.module('pragmaApp')
.directive('transitionToSection', function () {
  return {
    scope: {
      transitionDelay: '@'
    },
    restrict: 'A',
    link: function postLink(scope, element) {
      $(element).find('a[href^="#"]').click(function() {
        $('html, body').animate({
          scrollTop: $($(this).attr('href')).offset().top
        }, parseInt(scope.transitionDelay));
        return false;
      });
    }
  };
});
