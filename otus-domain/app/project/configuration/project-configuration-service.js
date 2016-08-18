(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .service('otusjs.otus-domain.project.ProjectConfigurationService', ProjectConfigurationService);

    ProjectConfigurationService.$inject = [];

    function ProjectConfigurationService() {
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
            // return OtusRestResourceService.getProjectConfig();
            var jsonSetUp = {
                "templateLocked": false,
                'file': {
                    "identity": {
                        'name': 'Elegibilidade',
                        'acronym': 'ELE'
                    }
                },
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
                "logoURL": null,
                "bannerURL": ''
            };
            return jsonSetUp;
        }

        function updateVisualIdentityConfiguration(files) {
            console.log(files);
            return true;
        }
    }
}());
