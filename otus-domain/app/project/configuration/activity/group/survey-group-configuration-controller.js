(function() {
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
    var self = this;
    self.groups = [];
    self.newGroup = '';
    self.information;

    /* Public methods */
    self.$onInit = onInit;
    self.addNewGroup = addNewGroup;
    self.edit = edit;
    self.update = update;
    self.deleteGroup = deleteGroup;

    function onInit() {
      _getListOfSurveyGroups();
    }

    function _getListOfSurveyGroups() {
      SurveyGroupConfigurationService.getListOfSurveyGroups()
        .then(function(data) {
          self.groups = data.getGroupList();
          if (self.groups.length === 0)
            self.information = 'Ainda não existem grupos, para criar você deve definir um nome e clicar em adicionar.';
        }).catch(function() {
          self.groups = [];
          self.information = 'Erro de comunicação com servidor, tente novamente mais tarder.';
        });
    }

    function addNewGroup() {
      SurveyGroupConfigurationService.addNewGroup(self.newGroup)
        .then(function(data) {
          $mdToast.show($mdToast.simple().textContent('O novo grupo foi adicionado na lista.').hideDelay(2000));
          _getListOfSurveyGroups();
        }).catch(function() {
          $mdToast.show($mdToast.simple().textContent('Ocorreu um erro, tente novamente mais tarde.').hideDelay(2000));
        });
    }

    function edit(group) {
      group.editMode = !group.editMode;
    }

    function update(group) {
      SurveyGroupConfigurationService.updateGroup(group)
        .then(function(data) {
          $mdToast.show($mdToast.simple().textContent('O novo grupo foi adicionado na lista.').hideDelay(2000));
          _getListOfSurveyGroups();
        }).catch(function() {
          $mdToast.show($mdToast.simple().textContent('Ocorreu um erro, tente novamente mais tarde.').hideDelay(2000));
        });
    }

    function deleteGroup(group) {
      $mdDialog.show($mdDialog.confirm()
        .title('Exclusão do grupo')
        .textContent('Você tem certeza que deseja excluir esse grupo?')
        .ariaLabel('exclusão do grupo')
        .ok('Sim')
        .cancel('Não')).then(function() {
        SurveyGroupConfigurationService.deleteGroup(group).then(function() {
          _getListOfSurveyGroups();
          $mdToast.show($mdToast.simple().textContent('O grupo foi excluído.').hideDelay(2000));
        }).catch(function() {
          $mdToast.show($mdToast.simple().textContent('Ocorreu um erro, tente novamente mais tarde.').hideDelay(2000));
        });
      }).catch(function() {

      });
    }
  }
}());
