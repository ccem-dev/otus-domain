(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('surveyTemplateConfiguration', {
      controller: "surveyTemplateConfigurationCtrl as $ctrl",
      templateUrl: 'app/project/configuration/activity/survey-template/survey-template-configuration-template.html',
      bindings: {
        surveyForm: '<',
        surveyTemplates: '='
      }
    }).controller('surveyTemplateConfigurationCtrl', Controller);

  Controller.$inject = [
    'otusjs.otus-domain.project.configuration.ProjectConfigurationService',
    '$mdDialog',
    '$mdToast',
    'otusjs.model.activity.ActivityPermissionFactory',
    'DashboardStateService',
    'ActivityConfigurationManagerService'
  ];

  function Controller(ProjectConfigurationService, $mdDialog, $mdToast, ActivityPermissionFactory, DashboardStateService, ActivityConfigurationManagerService) {
    var ERROR_MESSAGE = 'Ocorreu algum problema, tente novamente mais tarde';
    var timeShowMsg = 5000;
    var _deleteConfirmDialog;
    var self = this;
    self.showSettings;
    self.usersList = [];

    self.groups = [
      { name: 'RECRUTAMENTO' }
    ];

    /* Public methods */
    self.$onInit = onInit;
    self.showActivitySettings = showActivitySettings;
    self.deleteSurveyTemplate = deleteSurveyTemplate;
    self.querySearch = querySearch;
    self.onModelChange = onModelChange;

    function onInit() {
      self.permissionList = [];
      _dialogs();
      _getCollectionOfPermissions();
      self.permission = ActivityPermissionFactory.fromJsonObject({ acronym: self.surveyForm.surveyTemplate.identity.acronym, version: self.surveyForm.version });
    }

    function showActivitySettings() {
      _filterUsersWithPermissionExclusiveDisjunction();
      ActivityConfigurationManagerService.setSurveyToSettings(self.permission);
      DashboardStateService.goToActivitySettings();
    }

    function deleteSurveyTemplate() {
      $mdDialog.show(_deleteConfirmDialog).then(function () {
        var index = self.surveyTemplates.indexOf(self.surveyForm);
        ProjectConfigurationService.deleteSurveyTemplate(self.surveyForm.surveyTemplate.identity.acronym)
          .then(function () {
            self.surveyTemplates.splice(index, 1);
            $mdToast.show($mdToast.simple().textContent('Excluído').hideDelay(2000));
          })
          .catch(function () {
            $mdToast.show($mdToast.simple().textContent('Erro ao excluir').hideDelay(2000));
          });
      }, function () { });
    }

    function querySearch(criteria) {
      return criteria ? self.allContacts.filter(createFilterFor(criteria)) : [];
    }

    function onModelChange(newModel) {
      $log.log('The model has changed to ' + JSON.stringify(newModel) + '.');
    }

    function _filterUsersWithPermissionExclusiveDisjunction() {
      self.permissionList.forEach(function (permission) {
        if (permission.acronym === self.surveyForm.surveyTemplate.identity.acronym && permission.version == self.surveyForm.version) {
          self.permission = ActivityPermissionFactory.fromJsonObject(permission);
        }
      });
    }

    function _getCollectionOfPermissions() {
      ProjectConfigurationService.getCollectionOfPermissions()
        .then(function (data) {
          self.permissionList = data;
        }).catch(function () {
          $mdToast.show($mdToast.simple().textContent(ERROR_MESSAGE).hideDelay(timeShowMsg));
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
