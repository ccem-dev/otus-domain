(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('activityConfiguration', {
      controller: Controller,
      templateUrl: 'app/project/configuration/activity/activity-configuration-template.html'
    });

  Controller.$inject = [
    'otusjs.otus-domain.project.configuration.ProjectConfigurationService',
    '$mdToast'
  ];

  function Controller(ProjectConfigurationService, $mdToast) {
    const ERROR_MESSAGE = 'Ocorreu algum problema, tente novamente mais tarde';
    var timeShowMsg = 5000;
    var self = this;
    self.surveyTemplatesList = [];
    self.usersList = [];

    /* Public methods */
    self.$onInit = onInit;

    function onInit() {
      _getTemplatesList();
    }

    function _getTemplatesList() {
      ProjectConfigurationService.fetchSurveysManagerConfiguration()
        .then(function (data) {
          self.surveyTemplatesList = data;
        }).catch(function () {
          self.surveyTemplatesList = [];
          $mdToast.show($mdToast.simple().textContent(ERROR_MESSAGE).hideDelay(timeShowMsg));
        });
    }

  }
}());