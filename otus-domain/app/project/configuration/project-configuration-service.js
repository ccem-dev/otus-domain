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
        var templatesList = [{
            'name': 'Integração',
            'acronym': 'INT'
        }, {
            'name': 'Profile',
            'acronym': 'PRF'
        }, {
            'name': 'Edgar Alan',
            'acronym': 'POE'
        }, {
            'name': 'Elegibilidade',
            'acronym': 'ELEA'
        }, {
            'name': 'Gathering',
            'acronym': 'GOP'
        }, {
            'name': 'Stark',
            'acronym': 'NED'
        }, {
            'name': 'Theodor Evelyn Mosby',
            'acronym': 'TED'
        }];
        _init();

        /* Public Interface */
        self.fetchParticipantRegisterConfiguration = fetchParticipantRegisterConfiguration;
        self.fetchProjectsVisualIdentity = fetchProjectsVisualIdentity;
        self.updateParticipantRegisterConfiguration = updateParticipantRegisterConfiguration;
        self.updateVisualIdentityConfiguration = updateVisualIdentityConfiguration;


        function _init() {}


        /* Participant Register Section */
        function fetchParticipantRegisterConfiguration() {

            return templatesList;

            //TODO - rest on hold
            // var ProjectConfiguration = OtusRestResourceService.getProjectConfigurationResource();
            // var data = {};
            // ProjectConfiguration.getParticipantRegister(function(response) {
            //     console.log(response);
            //     data = response.data;
            // }, function() {
            //     data = {};
            // });
            //
            // return data;
            //expect: returns full object or {}
        }

        function updateParticipantRegisterConfiguration(fileList, successfullCallback, failureCallback) {
            // fileList.forEach(function(file) {
            //     templatesList.push(file);
            // });

            //TODO - return goes on then
            templatesList = templatesList.concat(fileList);
            return templatesList;
            // var ProjectConfiguration = OtusRestResourceService.getProjectConfigurationResource();
            // ProjectConfiguration.updateParticipantRegister(file,
            //     function(data) {
            //         console.log(data);
            //         successfullCallback();
            //     },
            //     function(error) {
            //         failureCallback();
            //     });


        }

        /* Visual Identity Section*/
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
