(function() {
  'use strict';

  angular
    .module('otusDomain.project')
    .directive('uppercaseText', function() {
      return {
        require: 'ngModel',
        link: function(scope, element, attr, ngModelCtrl) {
          function fromUser(text) {
            if (text) {
              var stringfiedText = String(text);
              var transformedInput = stringfiedText.toUpperCase();

                ngModelCtrl.$setViewValue(transformedInput);
                ngModelCtrl.$render();

              return String(transformedInput);
            }

            return undefined;
          }
          ngModelCtrl.$parsers.push(fromUser);
        }
      };
    });
}());
