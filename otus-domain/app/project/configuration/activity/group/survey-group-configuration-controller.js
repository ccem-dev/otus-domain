(function () {
  'use strict';

  angular
    .module('otusDomain.project')
    .controller('surveyGroupConfigurationCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
    '$mdDialog',
    'otusDomain.project.activity.SurveyGroupConfigurationService'
  ];

  function Controller($mdToast, $mdDialog, SurveyGroupConfigurationService) {
    const GROUP_ALREADY_EXISTS = 'Group already exists';
    var oldName;
    var self = this;
    self.groups = [];
    self.newGroup = '';
    self.error;

    /* Public methods */
    self.$onInit = onInit;
    self.addNewSurveyGroup = addNewSurveyGroup;
    self.edit = edit;
    self.updateSurveyGroupName = updateSurveyGroupName;
    self.deleteSurveyGroup = deleteSurveyGroup;

    function onInit() {
      _getListOfSurveyGroups();
    }

    function _getListOfSurveyGroups() {
      SurveyGroupConfigurationService.getListOfSurveyGroups()
        .then(function (response) {
          self.groups = response.getGroupList();
          if (self.groups.length === 0)
            self.error = 'Atualmente não existem grupos cadastrados, para criar um grupo você deve definir um nome e clicar em adicionar.';
          else
            self.error = undefined;
        }).catch(function (e) {
          self.groups = [];
          self.error = 'Erro de comunicação com servidor, tente novamente mais tarder.';
        });
    }

    function addNewSurveyGroup() {
      SurveyGroupConfigurationService.addNewSurveyGroup(self.newGroup)
        .then(function (response) {
          $mdToast.show($mdToast.simple().textContent('O novo grupo foi adicionado na lista.').hideDelay(2000));
          _getListOfSurveyGroups();
        }).catch(function (e) {
          if (GROUP_ALREADY_EXISTS === e.message) {
            $mdToast.show($mdToast.simple().textContent('Grupo já cadastrado.').hideDelay(2000));
          } else {
            $mdToast.show($mdToast.simple().textContent('Ocorreu um erro, tente novamente mais tarde.').hideDelay(2000));
          }
        });
      self.newGroup = '';
    }

    function edit(group) {
      oldName = group.getName();
      group.editMode = !group.editMode;
    }

    function updateSurveyGroupName(group) {
      SurveyGroupConfigurationService.updateSurveyGroupName(oldName, group.getName())
        .then(function (response) {
          $mdToast.show($mdToast.simple().textContent('O nome do grupo foi atualizado.').hideDelay(2000));
          _getListOfSurveyGroups();
        }).catch(function (e) {
          $mdToast.show($mdToast.simple().textContent('Ocorreu um erro, tente novamente mais tarde.').hideDelay(2000));
        });
    }

    function deleteSurveyGroup(group) {
      $mdDialog.show($mdDialog.confirm()
        .title('Exclusão do grupo')
        .textContent('Você tem certeza que deseja excluir esse grupo?')
        .ariaLabel('exclusão do grupo')
        .ok('Sim')
        .cancel('Não')).then(function () {
          SurveyGroupConfigurationService.deleteSurveyGroup(group)
            .then(function (response) {
              _getListOfSurveyGroups();
              $mdToast.show($mdToast.simple().textContent('O grupo foi excluído.').hideDelay(2000));
            }).catch(function (e) {
              $mdToast.show($mdToast.simple().textContent('Ocorreu um erro, tente novamente mais tarde.').hideDelay(2000));
            });
        });
    }
  }
}());
