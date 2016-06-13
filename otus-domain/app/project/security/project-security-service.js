(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .service('ProjectSecurityService', ProjectSecurityService);

    ProjectSecurityService.$inject = ['OtusRestResourceService', '$q'];

    function ProjectSecurityService(OtusRestResourceService, $q) {
        var self = this;
        self.isOnline = isOnline;

        function isOnline(project) {
            OtusRestResourceService.setUrl(project.projectRestUrl);
            var installerResource = OtusRestResourceService.getOtusInstallerResource();

            installerResource.ready(function(response) {
                    if (response.data) {
                        project.status = true;
                    } else {
                        project.status = false;
                    }
                },
                function(err) {
                    project.status = false;
                });
        }
    }

}());
