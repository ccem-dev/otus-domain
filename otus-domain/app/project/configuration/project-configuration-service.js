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


        function _init() {}


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
                'sendingDate': 'Mon Aug 03 2016 20:04:52 GMT-0300 (BRT)',
                'domain': ''
            };
            //expect: returns full object or {}
            return {};
        }

        function updateParticipantRegisterConfiguration(file) {
            //TODO
            // expected:
            // {
            //   'file':self.data.file,
            //   'date':new Date()
            // };
            if (file) {
                console.log(file);
            }
            return file;
        }


        /* Visual Identity */
        function fetchProjectsVisualIdentity() {
            // return OtusRestResourceService.getProjectConfig();
            var jsonSetUp ={
                    'files':{
                      "logoURL": null,
                      "bannerURL": ''
                    },
                    'date':''
                  };
            return jsonSetUp;
        }

        function updateVisualIdentityConfiguration(files) {
          //expected
          // {
          //   'files':{
          //       'logo': self.data.logoURL,
          //       'banner': self.data.bannerURL
          //   },
          //   'date':new Date()
          // }

            console.log(files);
            return true;
        }
    }
}());
