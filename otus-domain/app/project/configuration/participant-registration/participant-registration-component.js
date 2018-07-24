(function () {
  'use strict';

  angular
    .module('otusDomain.project.configuration')
    .component('otusParticipantRegistration', {
      controller: Controller,
      templateUrl: 'app/project/configuration/participant-registration/participant-registration-template.html'
    });

  Controller.$inject = [
    '$q',
    '$mdToast',
    'otusjs.otus-domain.project.configuration.ProjectConfigurationService'
  ];

  function Controller($q, $mdToast, ProjectConfigurationService) {
    const ERROR_MESSAGE = 'Erro de comunicação com servidor';
    const SUCCESS_MESSAGE = 'Alteração realizada com sucesso';
    var self = this;
    self.participantRegistration;
    self.error;

    /* Public methods */
    self.$onInit = onInit;
    self.setAllowNewParticipants = setAllowNewParticipants;

    function onInit() {
      _isAllowNewParticipants();
    }

    function _isAllowNewParticipants() {
      ProjectConfigurationService.getProjectConfiguration()
        .then(function (data) {
          self.participantRegistration = data.participantRegistration;
        }).catch(function () {
          self.error = true;
          $mdToast.show($mdToast.simple().textContent(ERROR_MESSAGE).hideDelay(5000));
        });
    }

    function setAllowNewParticipants() {
      if (self.participantRegistration) {
        ProjectConfigurationService.allowNewParticipants(true)
          .then(function (data) {
            self.participantRegistration = true;
            $mdToast.show($mdToast.simple().textContent(SUCCESS_MESSAGE).hideDelay(5000));
          }).catch(function () {
            $mdToast.show($mdToast.simple().textContent(ERROR_MESSAGE).hideDelay(5000));
          });
      } else {
        ProjectConfigurationService.allowNewParticipants(false)
          .then(function (data) {
            self.participantRegistration = false;
            $mdToast.show($mdToast.simple().textContent(SUCCESS_MESSAGE).hideDelay(5000));
          }).catch(function () {
            $mdToast.show($mdToast.simple().textContent(ERROR_MESSAGE).hideDelay(5000));
          });
      }
    }
  }
}());