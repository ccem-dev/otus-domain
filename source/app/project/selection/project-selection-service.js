(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .service('ProjectSelectionService', ProjectSelectionService);

    ProjectSelectionService.$inject = ['ProjectContext', '$mdDialog'];

    function ProjectSelectionService(ProjectContext, $mdDialog) {
        var self = this;

        self.choose = choose;
        self.initialChoose = initialChoose;

        function initialChoose() {
            if (!ProjectContext.hasProject()) {
                choose();
            }
        }

        function choose() {
            ProjectContext.loadProjects(function(projects){
                showModal(projects);
            });
        }

        function showModal(projects) {
            $mdDialog.show({
                controller: 'ProjectChooseController as projectChoose',
                templateUrl: 'app/project/selection/ui/dialog/project-choose-template.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {
                    projects: projects
                }
            });
        }
    }

}());
