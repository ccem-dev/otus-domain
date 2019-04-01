(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('surveyGroupConfiguration', {
      controller: 'surveyGroupConfigurationController as $ctrl',
      templateUrl: 'app/project/configuration/activity/group/survey-group-configuration-template.html'
    }).controller('surveyGroupConfigurationController', Controller);

  Controller.$inject = [
    '$mdToast',
    '$mdDialog',
    'otusDomain.project.activity.SurveyGroupConfigurationService'
  ];

  function Controller($mdToast, $mdDialog, SurveyGroupConfigurationService) {
    var GROUP_ALREADY_EXISTS = 'Group already exists';
    var oldName;
    var self = this;
    self.groups;
    self.newGroup = '';
    self.error;
    self.message;

    /* Public methods */
    self.$onInit = onInit;
    self.addNewSurveyGroup = addNewSurveyGroup;
    self.edit = edit;
    self.updateSurveyGroupName = updateSurveyGroupName;
    self.deleteSurveyGroup = deleteSurveyGroup;
    self.validUpdateName = validUpdateName;

    function onInit() {
      _getListOfSurveyGroups();
    }

    function _getListOfSurveyGroups() {
      SurveyGroupConfigurationService.getListOfSurveyGroups()
        .then(function (response) {
          self.groups = response.getGroupList();
          if (self.groups.length === 0) {
            self.error = 'Atualmente não existem grupos cadastrados, para criar um grupo você deve definir um nome e clicar em adicionar.';
          } else {
            self.error = undefined;
          }
        }).catch(function (e) {
          self.groups = [];
          self.error = 'Erro de comunicação com servidor, tente novamente mais tarder.';
        });
    }

    function addNewSurveyGroup() {
      if (self.newGroup) {
        SurveyGroupConfigurationService.addNewSurveyGroup(self.newGroup)
          .then(function (response) {
            $mdToast.show($mdToast.simple().textContent('O novo grupo foi adicionado na lista.').hideDelay(2000));
            _getListOfSurveyGroups();
          }).catch(function (e) {
            if (GROUP_ALREADY_EXISTS === e.message) {
              $mdToast.show($mdToast.simple().textContent('O nome escolhido já está em uso!').hideDelay(2000));
            } else {
              $mdToast.show($mdToast.simple().textContent('Ocorreu um erro, tente novamente mais tarde.').hideDelay(2000));
            }
          });
      } else {
        $mdToast.show($mdToast.simple().textContent('Você precisar definir um nome para o grupo!').hideDelay(2000));
      }
      self.newGroup = '';
    }

    function edit(group) {
      oldName = group.getName();
      group.editMode = !group.editMode;
    }

    function validUpdateName(newName, editMode) {
      if (editMode){
        return newName != oldName
      }
      return true;
    }

    function updateSurveyGroupName(group) {
      SurveyGroupConfigurationService.updateSurveyGroupName(oldName, group.getName())
        .then(function (response) {
          if (response.MESSAGE === 'Data Validation Fail: SurveyGroupName already in use') {
            $mdToast.show($mdToast.simple().textContent('Ocorreu um erro na tentativa de atualização. Por favor, verifique os dados informados.').hideDelay(2000));
            group.editMode = false;
            _getListOfSurveyGroups();
          } else {
            $mdToast.show($mdToast.simple().textContent('O nome do grupo foi atualizado.').hideDelay(2000));
            _getListOfSurveyGroups();
          }
        }).catch(function (e) {
          $mdToast.show($mdToast.simple().textContent('Ocorreu um erro, tente novamente mais tarde.').hideDelay(2000));
        });
    }

    function deleteSurveyGroup(group) {
      self.message = 'Você tem certeza que deseja excluir esse grupo?';
      if (group.getSurveys().length > 0)
        self.message = 'Existem atividades relacionadas ao grupo, você tem certeza que deseja excluir esse grupo?';
      $mdDialog.show($mdDialog.confirm()
        .title('Exclusão do grupo')
        .textContent(self.message)
        .ariaLabel('exclusão do grupo')
        .ok('Sim')
        .cancel('Não')).then(function () {
          SurveyGroupConfigurationService.deleteSurveyGroup(group.getName())
            .then(function (response) {
              $mdToast.show($mdToast.simple().textContent('O grupo foi excluído.').hideDelay(2000));
              _getListOfSurveyGroups();
            }).catch(function (e) {
              $mdToast.show($mdToast.simple().textContent('Ocorreu um erro, tente novamente mais tarde.').hideDelay(2000));
            });
        });
    }
  }

}());