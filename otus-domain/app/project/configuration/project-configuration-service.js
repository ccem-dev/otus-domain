(function() {
    'use strict'

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
                "templatePicked": "true",
                "templateLocked" : "true",
                "projectName": "ELSA",
                "projectOwner": "Bruce =]"
            };
            return jsonConfig;
        }

    }
}());
