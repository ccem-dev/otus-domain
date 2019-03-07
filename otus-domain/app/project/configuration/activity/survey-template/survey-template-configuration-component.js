(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('surveyTemplateConfiguration', {
      controller: "surveyTemplateConfigurationCtrl as $ctrl",
      templateUrl: 'app/project/configuration/activity/survey-template/survey-template-configuration-template.html',
      bindings: {
        surveyForm: '<',
        surveyTemplates: '=',
        mirrorEditModeStatus: '&',
        blocEdit: '<'
      }
    }).controller('surveyTemplateConfigurationCtrl', Controller);

  Controller.$inject = [
    'otusDomain.project.activity.SurveyGroupConfigurationService',
    'otusjs.otus-domain.project.configuration.ProjectConfigurationService',
    '$mdDialog',
    '$mdToast',
    'otusjs.model.activity.ActivityPermissionFactory',
    'DashboardStateService',
    'ActivityConfigurationManagerService'
  ];

  function Controller(SurveyGroupConfigurationService,ProjectConfigurationService, $mdDialog, $mdToast, ActivityPermissionFactory, DashboardStateService, ActivityConfigurationManagerService) {
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
    self.surveyGroupsEdit = surveyGroupsEdit;
    self.updateSurveyGroups = updateSurveyGroups;

    function onInit() {
      self.permissionList = [];
      _dialogs();
      _fetchGroups();
      _getCollectionOfPermissions();
      self.permission = ActivityPermissionFactory.fromJsonObject({ acronym: self.surveyForm.surveyTemplate.identity.acronym, version: self.surveyForm.version });
    }

    function showActivitySettings() {
      _filterUsersWithPermissionExclusiveDisjunction();
      ActivityConfigurationManagerService.setSurveyToSettings(self.permission);
      DashboardStateService.goToActivitySettings();
    }

    function surveyGroupsEdit() {
      if(!self.blocEdit){
        self.mirrorEditModeStatus({status: true});
        self.surveyGroupsEditMode = true;
      } else {
        $mdToast.show($mdToast.simple().textContent('Você já esta em modo de edição em outra atividade').hideDelay(2000));
      }
    }

    function updateSurveyGroups() {
      SurveyGroupConfigurationService.getListOfSurveyGroups()
        .then(function(data) {
          var oldGroups = data.getSurveyGroups(self.surveyForm.surveyTemplate.identity.acronym);
          var removedGroups = _getRemovedGroups(oldGroups);
          var newGroups = _getNewGroups(oldGroups);

          removedGroups.forEach(function (groupName) {
            var group = data.getGroup(groupName);
            group.removeSurvey(self.surveyForm.surveyTemplate.identity.acronym);
            SurveyGroupConfigurationService.updateSurveyGroupAcronyms(group.toJSON());
          });

          newGroups.forEach(function (newGroup) {
            var group = data.getGroup(newGroup.getName());
            group.addSurvey(self.surveyForm.surveyTemplate.identity.acronym);
            SurveyGroupConfigurationService.updateSurveyGroupAcronyms(group.toJSON());
          });

          self.mirrorEditModeStatus({status: false});
          self.surveyGroupsEditMode = false;
        })
    }

    function _getRemovedGroups(oldGroups){
      return oldGroups.filter(function(groupName){
        var foundGroup = self.surveyForm.groups.filter(function(newGroup){
          if(newGroup.getName() === groupName){
            return true
          }
        });
        return foundGroup.length <= 0;
      });
    }

    function _getNewGroups(oldGroups) {
      return self.surveyForm.groups.filter(function(newGroup){
        var foundGroup = oldGroups.filter(function(groupName){
          if(newGroup.getName() === groupName){
            return true
          }
        });
        return foundGroup.length <= 0;
      });
    }

    function deleteSurveyTemplate() {
      $mdDialog.show(_deleteConfirmDialog).then(function(){
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
      return criteria ? self.groupsManager.getGroupList().filter(_createFilterFor(criteria)) : [];
    }

    function _createFilterFor(query) {
      var lowercaseQuery = query.toLowerCase();

      return function filterFn(group) {
        return (group.getName().toLowerCase().indexOf(lowercaseQuery) !== -1);
      };

    }

    function onModelChange(newModel) {
      $log.log('The model has changed to ' + JSON.stringify(newModel) + '.');
    }

    function _filterUsersWithPermissionExclusiveDisjunction() {
      self.permissionList.forEach(function(permission){
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

    function _fetchGroups() {
      SurveyGroupConfigurationService.getListOfSurveyGroups()
        .then(function(data) {
          var groupNames = data.getSurveyGroups(self.surveyForm.surveyTemplate.identity.acronym);
          self.surveyForm.groups = [];
          groupNames.forEach(function(groupName){
            self.surveyForm.groups.push(data.getGroup(groupName))
          });
          self.groupsManager = data;
        }).catch(function() {
          self.groups = [];
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
