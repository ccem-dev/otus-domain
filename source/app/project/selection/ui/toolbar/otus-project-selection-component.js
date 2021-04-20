(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .component('otusProjectSelection', {
            controller: 'otusProjectSelectionCtrl as $ctrl',
            templateUrl: 'app/project/selection/ui/toolbar/otus-project-selection-toolbar.html'
        })
        .controller('otusProjectSelectionCtrl', Controller);

    Controller.$inject = ['$scope','ProjectSelectionService', 'ProjectContext'];

    function Controller($scope,ProjectSelectionService, ProjectContext) {
        var self = this;

        self.$onInit = function () {
            ProjectContext.registerObserver(function(project){
                self.project = project;
            });
            setTimeout(function () {
                ProjectSelectionService.chooseFirst();
            },300)
        }

        $scope.chooseProject = function() {
            ProjectSelectionService.choose();
        };

        $scope.hasProject = function() {
            return ProjectContext.hasProject();
        };
    }

}());
