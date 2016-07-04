(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .service('ProjectContext', ProjectContext);

    ProjectContext.$inject = ['RestResourceService'];

    function ProjectContext(RestResourceService) {
        var self = this;

        var current = null;
        var projects = [];
        self.setProject = setProject;
        self.hasProject = hasProject;
        self.getCurrentProject = getCurrentProject;
        self.loadProjects = loadProjects;

        function setProject(project) {
            current = project;
        }

        function getCurrentProject() {
            return current;
        }

        function hasProject() {
            return (current !== null);
        }

        function loadProjects(success) {
            var projectResource = RestResourceService.getOtusProjectResource();
            projectResource.fetchAll(function(response) {
                projects = response.data;
                success(projects);
            });
        }
    }
}());
