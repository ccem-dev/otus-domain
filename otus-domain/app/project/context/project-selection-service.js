(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .service('ProjectSelectionService', ProjectSelectionService);

    ProjectSelectionService.$inject = ['ProjectContext', '$mdDialog', 'RestResourceService'];

    function ProjectSelectionService(ProjectContext, $mdDialog, RestResourceService) {
        var self = this;
        var projectResource;
        var context = {};

        self.choose = choose;
        self.initialChoose = initialChoose;

        init();

        function init() {
            projectResource = RestResourceService.getOtusProjectResource();
        }

        function initialChoose() {
            if (!ProjectContext.hasProject()) {
                choose();
            }
        }

        function choose() {
            loadProjects(function(response) {
                context.projects = response.data;

                context.selected = ProjectContext.setProject;
                showModal();
            });
        }

        function showModal() {
            $mdDialog.show({
                controller: 'ProjectChooseController',
                templateUrl: 'app/project/context/dialog/project-choose-template.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {
                    context: context
                }
            });
        }

        function loadProjects(callback) {
            projectResource.fetchAll(callback);
        }
    }

}());
