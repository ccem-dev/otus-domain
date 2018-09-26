(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('surveyFormConfiguration', {
      controller: Controller,
      templateUrl: 'app/project/configuration/activity/survey-template/survey-template-configuration-template.html',
      bindings: {
        surveyTemplateData: '<'
      }
    });

  Controller.$inject = [
    'otusjs.otus-domain.project.configuration.ProjectConfigurationService',
    '$mdDialog',
    '$mdToast'
  ];

  function Controller(ProjectConfigurationService, $mdDialog, $mdToast) {
    var _deleteConfirmDialog;
    var self = this;
    self.usersList = [];
    self.showSettings;

    /* Public methods */
    self.$onInit = onInit;
    self.showActivitySettings = showActivitySettings;
    self.deleteSurveyTemplate = deleteSurveyTemplate;

    function onInit() {
      self.showSettings = false;
      // TODO: Apresentar a lista de usuários
      // _getUsersList();
      _dialogs();
    }

    function showActivitySettings() {
      // self.showSettings === false ? true : false;
      self.showSettings = true;
    }

    function deleteSurveyTemplate(index) {
      $mdDialog.show(_deleteConfirmDialog).then(function () {
        ProjectConfigurationService.deleteSurveyTemplate(self.surveyTemplatesList[index].surveyTemplate.identity.acronym)
          .then(function () {
            self.surveyTemplatesList.splice(index, 1);
            $mdToast.show($mdToast.simple().textContent('Excluído').hideDelay(2000));
          })
          .catch(function () {
            $mdToast.show($mdToast.simple().textContent('Erro ao excluir').hideDelay(2000));
          });
      }, function () { });

    }

    function _getUsersList() {
      ProjectConfigurationService.getUsersList()
        .then(function (data) {
          self.usersList = data;
        }).catch(function () {
          self.surveyTemplatesList = [];
          self.noListInfo = 'Erro de comunicação com servidor';
        });
    }

    function _dialogs() {
      _deleteConfirmDialog = $mdDialog.confirm()
        .title('Exclusão de Formulário')
        .textContent('Você tem certeza que deseja excluir esse Formulário?')
        .ariaLabel('exclusão de formulário')
        .ok('Sim')
        .cancel('Não');
    }

  }
}());