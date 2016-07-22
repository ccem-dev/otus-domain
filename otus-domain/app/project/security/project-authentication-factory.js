(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .factory('ProjectAuthenticationFactory', ProjectAuthenticationFactory);

    function ProjectAuthenticationFactory() {
        var self = this;
        self.create = create;

        function create(project) {
            var projectName = project.projectName;
            var projectToken = project.projectToken;

            return new ProjectAuthentication(projectToken, projectName);
        }

        return self;
    }

    function ProjectAuthentication(projectToken, projectName){
        var self = this;

        self.projectToken = projectToken;
        self.projectName = projectName;
    }

}());
