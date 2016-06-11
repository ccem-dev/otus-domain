(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .service('ProjectSecurityService', ProjectSecurityService);

    ProjectSecurityService.$inject = ['OtusRestResourceService'];

    function ProjectSecurityService(OtusRestResourceService) {
        var self = this;
        var installerResource;
        self.isOnline = isOnline;

        init();

        function init() {
            installerResource = OtusRestResourceService.getOtusInstallerResource();
        }

        function authenticate(project) {
            // TODO Authenticar apos a seleção de um determinado otus;
        }

        function isOnline(project) {
            // TODO Utilizar url customizada
            installerResource.ready(function success(response) {
                if (response.data) {
                    project.status = true;
                } else {
                    project.status = false;

                }
            }, function err(){
                    project.status = false;
            });
        }
    }

}());
