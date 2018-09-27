(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('activityConfiguration', {
      controller: Controller,
      templateUrl: 'app/project/configuration/activity/activity-configuration-template.html'
    });

  Controller.$inject = [
    'otusjs.otus-domain.project.configuration.ProjectConfigurationService'
  ];

  function Controller(ProjectConfigurationService) {
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
          if (self.surveyTemplatesList.length === 0) {
            self.noListInfo = 'Nenhum formulário adicionado';
          } else {
            self.noListInfo = '';
          }
        }).catch(function () {
          self.surveyTemplatesList = [];
          self.noListInfo = 'Erro de comunicação com servidor';
        });
    }

  }
}());