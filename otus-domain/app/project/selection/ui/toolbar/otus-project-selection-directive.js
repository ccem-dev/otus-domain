(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .directive('otusProjectSelection', directive);

    directive.$inject = ['ProjectSelectionService', 'ProjectContext'];

    function directive(ProjectSelectionService, ProjectContext) {
        var ddo = {
            templateUrl: 'app/project/selection/ui/toolbar/otus-project-selection-toolbar.html',
            restrict: 'E',
            link: linkFunction,
        };
        return ddo;

        function linkFunction($scope, $element, attributes) {
            $scope.project = ProjectContext.getCurrentProject();

            $scope.chooseProject = function() {
                ProjectSelectionService.choose();
            };

            $scope.hasProject = function() {
                return ProjectContext.hasProject();
            };

            ProjectContext.registerObserver(function(project){
                $scope.project = project;
            });
        }
    }

}());
