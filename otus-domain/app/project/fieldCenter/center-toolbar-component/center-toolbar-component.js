(function() {
  'use strict';

  angular
    .module('otusDomain.project.fieldCenter')
    .component('centerToolbar', {
      controller: Controller,
      templateUrl: 'app/project/fieldCenter/center-toolbar-component/center-toolbar-component.html'
    });

  Controller.$inject = ['DashboardStateService', '$scope', 'ProjectFieldCenterService', '$mdToast'];

  function Controller(){

  }
}());