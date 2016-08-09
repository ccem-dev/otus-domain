(function(){
  'use strict';

  angular
    .module('otusDomain.project')
    .controller('ProjectConfigurationController', ProjectConfigurationController);

    ProjectConfigurationController.$inject=[
      'ProjectConfigurationService'
    ];

    function ProjectConfigurationController(ProjectConfigurationService) {
      var self = this;
      _init();

      /*Public interface*/


      function _init() {
        self.data  = ProjectConfigurationService.fetchConfig();
      }



    }
}());
