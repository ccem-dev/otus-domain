(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .service('ProjectContext', ProjectContext);

    ProjectContext.$inject = ['RestResourceService', 'ProjectFactory'];

    function ProjectContext(RestResourceService, ProjectFactory) {
        var self = this;
        var current = null;
        var projects = [];
        var observers = [];

        self.setProject = setProject;
        self.hasProject = hasProject;
        self.getCurrentProject = getCurrentProject;
        self.loadProjects = loadProjects;
        self.registerObserver = registerObserver;

        function _resetProjects() {
            projects = [];
        }

        function setProject(project) {
            current = project;
            propagateChange();
        }

        function getCurrentProject() {
            return current;
        }

        function hasProject() {
            return (current !== null);
        }

        function loadProjects(callback) {
            _resetProjects();

            var projectResource = RestResourceService.getOtusProjectResource();
            projectResource.list(function(response) {

                response.data.forEach(function(element, index, array) {
                    var name = element.projectName;
                    var url = element.projectRestUrl;
                    var accessToken = element.projectToken;
                    var project = ProjectFactory.create(name, url, accessToken);
                    projects.push(project);
                });

                callback(projects);
            });
        }

        function registerObserver(callback) {
            observers.push(callback);
        }

        function propagateChange() {
            observers.forEach(function(observer) {
                observer(current);
            });
        }
    }
}());
