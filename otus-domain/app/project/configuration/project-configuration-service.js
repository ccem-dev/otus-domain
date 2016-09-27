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
            'acronym': 'INT',
            'templateType': ''
        }, {
            'name': 'Profile',
            'acronym': 'PRF',
            'templateType': 'profile'
        }, {
            'name': 'Edgar Alan',
            'acronym': 'POE',
            'templateType': 'profile'
        }, {
            'name': 'Elegibilidade',
            'acronym': 'ELEA',
            'templateType': ''
        }, {
            'name': 'Gathering',
            'acronym': 'GOP',
            'templateType': ''
        }, {
            'name': 'Stark',
            'acronym': 'NED',
            'templateType': ''
        }, {
            'name': 'Theodor Evelyn Mosby',
            'acronym': 'TED',
            'templateType': 'profile'
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
            var ProjectConfiguration = OtusRestResourceService.getProjectConfigurationResource();


            //TODO - rest on hold
            // var data = {};
            ProjectConfiguration.getParticipantRegister(function(response) {
                console.log(response);
            }, function() {
                console.log('error');
            });
            return templatesList;
            //
            // return data;
            //expect: returns full object or {}
        }

        function updateParticipantRegisterConfiguration(fileList, successfullCallback, failureCallback) {
            fileList.forEach(function(file) {
                templatesList.push({
                    'acronym': file.identity.acronym,
                    'name': file.identity.name,
                    'templateType':''
                });
            });
            successfullCallback(templatesList);
            var ProjectConfiguration = OtusRestResourceService.getProjectConfigurationResource();
            ProjectConfiguration.updateParticipantRegister(fileList,
                function(data) {
                    console.log(data);
                },
                function(error) {
                    failureCallback();
                });


            //TODO - return goes on then


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
