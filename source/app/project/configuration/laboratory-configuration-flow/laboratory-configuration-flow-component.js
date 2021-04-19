(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('laboratoryConfigurationFlow', {
      controller: 'laboratoryConfigurationFlowCtrl as $ctrl',
      templateUrl: 'app/project/configuration/laboratory-configuration-flow/laboratory-configuration-flow-template.html'
    })
    .controller('laboratoryConfigurationFlowCtrl', Controller);

  Controller.$inject = [
    '$q',
    '$mdToast',
    '$mdDialog',
    'otusDomain.LoadingScreenService',
    'otusDomain.rest.configuration.ProjectConfigurationService'
  ];

  function Controller($q, $mdToast, $mdDialog, LoadingScreenService, ProjectConfigurationService) {
    var self = this;

    /*variables*/
    self.groupedTubesMoments = [];
    self.selectedTube = {};
    self.selectedMoment = {};
    self.selectedExams = [];
    self.selectedAliquots = [];

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /*public methods*/

    function onInit() {
      self.groupEditModeStatus = false;
    }
  }
}());
