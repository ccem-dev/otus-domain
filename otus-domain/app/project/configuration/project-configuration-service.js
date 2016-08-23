(function() {
    'use strict';

    angular
        .module('otusDomain.project.configuration')
        .service('otusjs.otus-domain.project.configuration.ProjectConfigurationService', ProjectConfigurationService);

    ProjectConfigurationService.$inject = [
        'OtusRestResourceService'
    ];

    function ProjectConfigurationService(OtusRestResourceService) {
        var self = this;
        _init();
        /* Public Interface */
        self.fetchParticipantRegisterConfiguration = fetchParticipantRegisterConfiguration;
        self.fetchProjectsVisualIdentity = fetchProjectsVisualIdentity;
        self.updateParticipantRegisterConfiguration = updateParticipantRegisterConfiguration;
        self.updateVisualIdentityConfiguration = updateVisualIdentityConfiguration;


        function _init() {}


        /* Participant Register Fetcher */
        function fetchParticipantRegisterConfiguration() {
            var ProjectConfiguration = OtusRestResourceService.getProjectConfigurationResource();
            var data = {};
            ProjectConfiguration.getParticipantRegister(function(response) {
                data = response.data;
            }, function() {
                data = {};
            });

            return data;
            //expect: returns full object or {}
        }

        function updateParticipantRegisterConfiguration(file, successfullCallback, failureCallback) {
            var ProjectConfiguration = OtusRestResourceService.getProjectConfigurationResource();
            ProjectConfiguration.updateParticipantRegister(file, function(data) {
                successfullCallback();
            }, function(error) {
                failureCallback();
            });
        }


        /* Visual Identity */
        function fetchProjectsVisualIdentity() {
            var ProjectConfiguration = OtusRestResourceService.getProjectConfigurationResource();
            var data = {};
            ProjectConfiguration.getVisualIdentity(function(response) {
                data = response.data;
            }, function() {
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
            return success;
        }
    }
}());
