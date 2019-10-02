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
            OtusRestResourceService.setUrl(project.url);
            var installerResource = OtusRestResourceService.getOtusInstallerResource();

            installerResource.ready(
                function(response) {
                    if (response.data) {
                        project.online();
                    } else {
                        project.offline();
                    }
                },
                function() {
                    project.offline();
                }
            );
        }

        function authenticate(project) {
            var deferred = $q.defer();

            OtusRestResourceService.setUrl(project.url);
            var authentication = project.getAuthentication();
            var otusAuthenticatorResource = OtusRestResourceService.getOtusAuthenticatorResource();

            otusAuthenticatorResource.authenticateProject(authentication, function(response) {
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
