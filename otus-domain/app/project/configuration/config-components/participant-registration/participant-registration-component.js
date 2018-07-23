(function () {
  'use strict';

  angular
    .module('otusDomain.project.configuration')
    .component('otusParticipantRegistration', {
      controller: Controller,
      templateUrl: 'app/project/configuration/config-components/participant-registration/participant-registration-template.html'
    });

  Controller.$inject = [
    '$q',
    '$mdToast',
    'otusjs.otus-domain.project.configuration.ProjectConfigurationService'
  ];

  function Controller($q, $mdToast, ProjectConfigurationService) {
    var self = this;
    self.participantRegistration;

    /* Public methods */
    self.$onInit = onInit;
    self.allowNewParticipants = allowNewParticipants;

    function onInit() {
      self.participantRegistration = ProjectConfigurationService.getProjectConfiguration().participantRegistration;
    }

    function allowNewParticipants() {
      if (self.participantRegistration)
        ProjectConfigurationService.allowNewParticipants(false);
      else
        ProjectConfigurationService.allowNewParticipants(true);
    }
  }
}());