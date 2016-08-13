(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .service('ProjectConfigurationService', ProjectConfigurationService);

    ProjectConfigurationService.$inject = [];

    function ProjectConfigurationService() {
      var self = this;

      self.fetchConfig = fetchConfig;

        function fetchConfig() {
            // return OtusRestResourceService.getProjectConfig();
            var jsonConfig = {
                "templateName": "Elegibilidade",
                "templatePicked": false,
                "templateLocked" : false,
                "projectName": "LINDA"
            };
            return jsonConfig;
        }

    }
}());
