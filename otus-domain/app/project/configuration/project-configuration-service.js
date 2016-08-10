(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .service('ProjectConfigurationService', ProjectConfigurationService);

    ProjectConfigurationService.$inject = [];

    function ProjectConfigurationService() {
      var self = this;

      self.fetchConfig = fetchConfig;
      self.uploadFile = uploadFile;

        function fetchConfig() {
            // return OtusRestResourceService.getProjectConfig();
            var jsonConfig = {
                "templateName": "Elegibilidade",
                "templatePicked": false,
                "templateLocked" : false,
                "projectName": "ELSA",
                "projectOwner": "Bruce =]"
            };
            return jsonConfig;
        }


        function uploadFile() {
          var reader = new FileReader();

          console.log(reader);
        }

    }
}());
