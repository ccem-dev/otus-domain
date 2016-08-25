(function() {
    'use strict';

    angular
        .module('otusDomain.project.configuration')
        .service('otusjs.otus-domain.project.configuration.ProjectConfigurationService', ProjectConfigurationService);

    ProjectConfigurationService.$inject = [
        'OtusRestResourceService',
        '$http'
    ];

    function ProjectConfigurationService(OtusRestResourceService, $http) {
        var self = this;
        _init();

        /* Public Interface */
        self.fetchParticipantRegisterConfiguration = fetchParticipantRegisterConfiguration;
        self.fetchProjectsVisualIdentity = fetchProjectsVisualIdentity;
        self.updateParticipantRegisterConfiguration = updateParticipantRegisterConfiguration;
        self.updateVisualIdentityConfiguration = updateVisualIdentityConfiguration;


        function _init() {
        }


        /* Participant Register Fetcher */
        function fetchParticipantRegisterConfiguration() {
            var ProjectConfiguration = OtusRestResourceService.getProjectConfigurationResource();
            var data = {};
            ProjectConfiguration.getParticipantRegister(function(response) {
              console.log(response);
                data = response.data;
            }, function() {
                data = {};
            });

            return data;
            //expect: returns full object or {}
        }

        function updateParticipantRegisterConfiguration(file, successfullCallback, failureCallback) {
            var ProjectConfiguration = OtusRestResourceService.getProjectConfigurationResource();
            ProjectConfiguration.updateParticipantRegister(file,
                function(data) {
                    console.log(data);
                    successfullCallback();
                },
                function(error) {
                    failureCallback();
                });


        }

        // function lalaia() {
        //
        //     $http({
        //         method: 'POST',
        //         url: '/someUrl'
        //     }).success(function successCallback(response, a, b) {
        //         console.log(response);
        //         console.log(a);
        //         console.log(b);
        //         console.log((b()));
        //         console.log('sucesso');
        //         // this callback will be called asynchronously
        //         // when the response is available
        //     }).error(function errorCallback(response) {
        //         console.log('erro');
        //         // called asynchronously if an error occurs
        //         // or server returns response with an error status.
        //     });
        // }


        /* Visual Identity */
        function fetchProjectsVisualIdentity() {
            var ProjectConfiguration = OtusRestResourceService.getProjectConfigurationResource();
            var data = {};
            ProjectConfiguration.getVisualIdentity(function(response) {
                data = response.data;
            }, function(error) {
                console.log('error ' + error);
                data = {};
            });
            return data;
        }

        function updateVisualIdentityConfiguration(files, successfullCallback, failureCallback) {
            var ProjectConfiguration = OtusRestResourceService.getProjectConfigurationResource();
            var success;
            ProjectConfiguration.updateVisualIdentity(files, function() {
                successfullCallback();
            }, function() {
                failureCallback();
            });
        }
    }
}());
