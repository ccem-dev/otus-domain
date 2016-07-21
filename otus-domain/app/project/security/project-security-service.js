(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .service('ProjectSecurityService', ProjectSecurityService);

    ProjectSecurityService.$inject = ['OtusRestResourceService', '$q', 'ProjectContext', 'ProjectAuthenticationFactory'];

    function ProjectSecurityService(OtusRestResourceService, $q, ProjectContext, ProjectAuthenticationFactory) {
        var self = this;
        self.isOnline = isOnline;
        self.authenticate = authenticate;

        function isOnline(project) {
            OtusRestResourceService.setUrl(project.projectRestUrl);
            var installerResource = OtusRestResourceService.getOtusInstallerResource();

            installerResource.ready(function(response) {
                    project.status = response.data;
                },
                function(err) {
                    project.status = false;
                });
        }

        function authenticate(project) {
            var deferred = $q.defer();

            OtusRestResourceService.setUrl(project.projectRestUrl);

            var projectAuthentication = ProjectAuthenticationFactory.create(project);
            var otusAuthenticatorResource = OtusRestResourceService.getOtusAuthenticatorResource();

            otusAuthenticatorResource.authenticateProject(projectAuthentication, function(response) {
                if (!response.hasErrors) {
                    approvedAuthentication(response.data, project);
                    deferred.resolve();
                } else {
                    rejectAuthentication();
                    deferred.reject();
                }
            });

            return deferred.promise;
        }

        function approvedAuthentication(token, project) {
            project.sessionToken = token;
            OtusRestResourceService.setSecurityProjectToken(project.sessionToken);
            ProjectContext.setProject(project);
        }

        function rejectAuthentication() {
            OtusRestResourceService.resetConnectionData();
            rollbackAuthenticationAttempt();
        }

        function rollbackAuthenticationAttempt() {
            if (ProjectContext.hasProject()) {
                var lastSelectedProject = ProjectContext.getCurrentProject();
                OtusRestResourceService.setUrl(lastSelectedProject.projectRestUrl);
                OtusRestResourceService.setSecurityProjectToken(lastSelectedProject.sessionToken);
            }
        }
    }

}());
