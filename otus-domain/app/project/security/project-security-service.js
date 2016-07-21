(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .service('ProjectSecurityService', ProjectSecurityService);

    ProjectSecurityService.$inject = ['OtusRestResourceService', '$q', 'ProjectContext'];

    function ProjectSecurityService(OtusRestResourceService, $q, ProjectContext) {
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

            var projectToken = project.projectToken;
            var otusAuthenticatorResource = OtusRestResourceService.getOtusAuthenticatorResource();

            otusAuthenticatorResource.authenticateProject(projectToken, function(response) {
                if (!response.hasErrors) {
                    project.sessionToken = response.data;
                    OtusRestResourceService.setSecurityProjectToken(project.sessionToken);

                    ProjectContext.setProject(project);
                    deferred.resolve();
                }else{
                    deferred.reject();
                }
            });

            return deferred.promise;
        }
    }

}());
