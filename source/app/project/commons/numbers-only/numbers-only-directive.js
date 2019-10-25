(function() {
  'use strict';

  angular
    .module('otusDomain.project')
    .directive('numbersOnly', function() {
      return {
        require: 'ngModel',
        link: function(scope, element, attr, ngModelCtrl) {
          function fromUser(text) {
            if (text) {
              var stringfiedText = String(text);
              var transformedInput = stringfiedText.replace(/[^0-9|\r|\n]/g, '');
              if (transformedInput !== stringfiedText) {
                ngModelCtrl.$setViewValue(transformedInput);
                ngModelCtrl.$render();
              }
              return String(transformedInput);
            }

            return undefined;
          }
          ngModelCtrl.$parsers.push(fromUser);
        }
      };
    });
}());
