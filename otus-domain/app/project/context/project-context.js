(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .service('ProjectContext', ProjectContext);

    ProjectContext.$inject = ['RestResourceService', '$window'];

    function ProjectContext(RestResourceService, $window) {
        var self = this;
        var current = null;
        var projects = [];
        var observers = [];

        self.setProject = setProject;
        self.hasProject = hasProject;
        self.getCurrentProject = getCurrentProject;
        self.loadProjects = loadProjects;
        self.registerObserver = registerObserver;

        function setProject(project) {
            current = project;
            propagateChange(current);
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

        function registerObserver(callback) {
            observers.push(callback);
        }

        function propagateChange() {
            observers.forEach(function(observer, index, array) {
                observer(current);
            });
        }
    }
}());
