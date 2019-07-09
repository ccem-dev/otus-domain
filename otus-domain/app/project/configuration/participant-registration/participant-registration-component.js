(function () {
  'use strict';

  angular
    .module('otusDomain.project.configuration')
    .component('otusParticipantRegistration', {
      controller: "otusParticipantRegistrationCtrl as $ctrl",
      templateUrl: 'app/project/configuration/participant-registration/participant-registration-template.html'
    })
    .controller('otusParticipantRegistrationCtrl', Controller);

  Controller.$inject = [
    '$q',
    '$mdToast',
    'otusDomain.rest.configuration.ProjectConfigurationService'
  ];

  function Controller($q, $mdToast, ProjectConfigurationService) {
    var ERROR_MESSAGE = 'Erro de comunicação com servidor';
    var SUCCESS_MESSAGE = 'Alteração realizada com sucesso';
    var self = this;
    self.participantRegistration;
    self.autoGenerateRecruitmentNumber;
    self.error;

    /* Public methods */
    self.$onInit = onInit;
    self.setAllowNewParticipants = setAllowNewParticipants;
    self.setAutoGenerateRecruitmentNumber = setAutoGenerateRecruitmentNumber;

    function onInit() {
     _getProjectConfiguration();
    }

    function _getProjectConfiguration() {
      ProjectConfigurationService.getProjectConfiguration()
        .then(function (data) {
          self.participantRegistration = data.participantRegistration;
          self.autoGenerateRecruitmentNumber = data.autoGenerateRecruitmentNumber;
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

    function setAutoGenerateRecruitmentNumber() {
      if (self.autoGenerateRecruitmentNumber) {
        ProjectConfigurationService.autoGenerateRecruitmentNumber(true)
          .then(function (data) {
            self.autoGenerateRecruitmentNumber = true;
            $mdToast.show($mdToast.simple().textContent(SUCCESS_MESSAGE).hideDelay(5000));
          }).catch(function () {
          $mdToast.show($mdToast.simple().textContent(ERROR_MESSAGE).hideDelay(5000));
        });
      } else {
        ProjectConfigurationService.autoGenerateRecruitmentNumber(false)
          .then(function (data) {
            self.autoGenerateRecruitmentNumber = false;
            $mdToast.show($mdToast.simple().textContent(SUCCESS_MESSAGE).hideDelay(5000));
          }).catch(function () {
          $mdToast.show($mdToast.simple().textContent(ERROR_MESSAGE).hideDelay(5000));
        });
      }
    }
  }
}());