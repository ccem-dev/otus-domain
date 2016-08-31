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
                function() {
                    project.status = false;
                });
        }

        function authenticate(project) {
            var deferred = $q.defer();

            OtusRestResourceService.setUrl(project.projectRestUrl);

            var projectAuthentication = ProjectAuthenticationFactory.create(project);
            var otusAuthenticatorResource = OtusRestResourceService.getOtusAuthenticatorResource();

            otusAuthenticatorResource.authenticateProject(projectAuthentication, function(response) {
                if (response.data) {
                    deferred.resolve(response);
                } else {
                    deferred.reject(response);
                }
            });

            return deferred.promise;
        }
    }

}());
