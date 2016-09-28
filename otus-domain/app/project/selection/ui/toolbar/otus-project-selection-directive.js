(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .directive('otusProjectSelection', directive);

    function directive() {
        var ddo = {
            templateUrl: 'app/project/selection/ui/toolbar/otus-project-selection-toolbar.html',
            restrict: 'E',
            link: linkFunction,
        };
        return ddo;

        function linkFunction($scope, $element, attributes) {
        }
    }

}());
