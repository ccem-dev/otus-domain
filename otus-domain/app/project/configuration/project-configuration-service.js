(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .service('otusjs.otus-domain.project.ProjectConfigurationService', ProjectConfigurationService);

    ProjectConfigurationService.$inject = [];

    function ProjectConfigurationService() {
        var self = this;

        /* Public Interface */
        self.fetchParticipantRegisterConfiguration = fetchParticipantRegisterConfiguration;
        self.fetchProjectsVisualIdentity = fetchProjectsVisualIdentity;
        self.updateParticipantRegisterConfiguration = updateParticipantRegisterConfiguration;
        self.updateVisualIdentityConfiguration = updateVisualIdentityConfiguration;

        /* Participant Register Fetcher */
        function fetchParticipantRegisterConfiguration() {
            // return OtusRestResourceService.getProjectConfig();
            var jsonSetUp = {
                "templateLocked": false,
                'file': {
                    "identity": {
                        'name': 'Elegibilidade',
                        'acronym': 'ELE'
                    }
                },
                'userEmail':'brenoscheffer@gmail.com',
                'sendingDate': 'Mon Aug 03 2016 20:04:52 GMT-0300 (BRT)'
            };
            return jsonSetUp;
        }

        function updateParticipantRegisterConfiguration(file) {
          //TODO
          //find out who is gonna resolve user email and sending date
            if (file) {
                console.log(file);
            }
        }


        /* Visual Identity */
        function fetchProjectsVisualIdentity() {
            // return OtusRestResourceService.getProjectConfig();
            var jsonSetUp = {
                "logoURL": '',
                "bannerURL": ''
            };
            return jsonSetUp;
        }

        function updateVisualIdentityConfiguration(files) {
            console.log(files);
        }
    }
}());
