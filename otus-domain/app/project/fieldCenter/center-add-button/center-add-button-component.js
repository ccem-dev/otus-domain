(function() {
  'use strict';

  angular
    .module('otusDomain.project.fieldCenter')
    .component('centerAddButton', {
      controller: Controller,
      templateUrl: 'app/project/fieldCenter/center-add-button/center-add-button-template.html'
    });

  Controller.$inject = [
    'DashboardStateService'
  ];

  function Controller(DashboardStateService) {
    var self = this;

    self.create = create;

    function create() {
      DashboardStateService.goToProjectCentersAdd();
    }
  }
}());
