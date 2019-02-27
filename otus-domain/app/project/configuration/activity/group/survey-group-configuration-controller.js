(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .controller('surveyGroupConfigurationCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
    '$mdDialog',
    'otusDomain.LoadingScreenService',
    'otusjs.otus-domain.project.configuration.ProjectConfigurationService',
  ];

  function Controller($mdToast, $mdDialog, LoadingScreenService, ProjectConfigurationService) {
    var self = this;
    self.newGroup = '';
    self.groups = [
      { name: 'RECRUTAMENTO' },
      { name: 'CHAMADAS INICIAIS' },
      { name: 'APÓS CHAMADAS' },
      { name: 'CHAMADAS DE AGENDA' }
    ];

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
      ProjectConfigurationService.getListOfSurveyGroups()
        .then(function (data) {
          self.groups = data;
          if (self.groups.length === 0)
            self.information = 'Nenhum formulário adicionado';
        }).catch(function () {
          self.groups = [];
          self.information = 'Erro de comunicação com servidor';
        });
    }

    function addNewGroup() {
      ProjectConfigurationService.addNewGroup(self.newGroup)
        .then(function () {
          // TODO: O que deve ser realizado quando obtiver sucesso?
          _getListOfSurveyGroups();
        }).catch(function () {
          // TODO: O que deve ser realizando quando ocorrer um erro?
        });
    }

    function edit(group) {
      group.editMode = !group.editMode;
    }

    function update(group) {
      ProjectConfigurationService.editGroup(group)
        .then(function () {
          // TODO: O que deve ser realizado quando obtiver sucesso?
          _getListOfSurveyGroups();
        }).catch(function () {
          // TODO: O que deve ser realizando quando ocorrer um erro?
        });
    }

    function deleteGroup(group, index) {
      $mdDialog.show($mdDialog.confirm()
        .title('Exclusão do grupo')
        .textContent('Você tem certeza que deseja excluir esse grupo?')
        .ariaLabel('exclusão do grupo')
        .ok('Sim')
        .cancel('Não')).then(function () {
          ProjectConfigurationService.deleteGroup(group, index).then(function () {
            $mdToast.show($mdToast.simple().textContent('O grupo foi excluído.').hideDelay(2000));
          }).catch(function () {
            $mdToast.show($mdToast.simple().textContent('Ocorreu um erro. tente novamente mais tarde.').hideDelay(2000));
          });
        }).catch(function () {

        });
    }
  }
}());