(function(){
  'use strict';

  angular
    .module('otusDomain.project.configuration')
    .controller('otusjs.otus-domain.project.configuration.ProjectConfigurationController', ProjectConfigurationController);

    ProjectConfigurationController.$inject=[
      'otusjs.otus-domain.project.configuration.ProjectConfigurationService'
    ];

    function ProjectConfigurationController(ProjectConfigurationService) {
      var self = this;
    }
}());
