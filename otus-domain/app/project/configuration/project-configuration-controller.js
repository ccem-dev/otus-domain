(function(){
  'use strict';

  angular
    .module('otusDomain.project')
    .controller('otusjs.otus-domain.project.ProjectConfigurationController', ProjectConfigurationController);

    ProjectConfigurationController.$inject=[
      'otusjs.otus-domain.project.ProjectConfigurationService'
    ];

    function ProjectConfigurationController(ProjectConfigurationService) {
      var self = this;
      _init();

      /*Public interface*/


      function _init() {
        console.log('smile and wave');
      }



    }
}());
