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
    self.addressCensusRequired;
    self.error;

    /* Public methods */
    self.$onInit = onInit;
    self.setAllowNewParticipants = setAllowNewParticipants;
    self.setAutoGenerateRecruitmentNumber = setAutoGenerateRecruitmentNumber;
    self.setAddressCensusRequired = setAddressCensusRequired;

    function onInit() {
     _getProjectConfiguration();
    }

    function _getProjectConfiguration() {
      ProjectConfigurationService.getProjectConfiguration()
        .then(function (data) {
          self.participantRegistration = data.participantRegistration;
          self.autoGenerateRecruitmentNumber = data.autoGenerateRecruitmentNumber;
          self.addressCensusRequired = data.addressCensusRequired;
        }).catch(function () {
          self.error = true;
          _showToast(ERROR_MESSAGE);
        });
    }

    function setAllowNewParticipants() {
        ProjectConfigurationService.allowNewParticipants(self.participantRegistration)
          .then(function (data) {
              _showToast(SUCCESS_MESSAGE);
          })
          .catch(function () {
              _showToast(ERROR_MESSAGE);
          });
    }

    function setAutoGenerateRecruitmentNumber() {
        ProjectConfigurationService.autoGenerateRecruitmentNumber(self.autoGenerateRecruitmentNumber)
            .then(function (data) {
                _showToast(SUCCESS_MESSAGE);
            })
            .catch(function () {
                _showToast(ERROR_MESSAGE);
            });
    }

    function setAddressCensusRequired() {
        ProjectConfigurationService.addressCensusRequired(self.addressCensusRequired)
            .then(data => {
                _showToast(SUCCESS_MESSAGE);
            })
            .catch(() => {
                _showToast(ERROR_MESSAGE);
            });
    }

    function _showToast(text) {
        $mdToast.show($mdToast.simple()
            .textContent(text)
            .hideDelay(5000));
    }
  }
}());