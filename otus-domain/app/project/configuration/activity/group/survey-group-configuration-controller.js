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
      SurveyGroupConfigurationService.getListOfSurveyGroups()
        .then(function (data) {
          self.groups = data.getGroupList();
          if (self.groups.length === 0)
            // TODO: Onde está informação será exibida?
            // TODO: QUem sabe trocar para um $mdToast?
            self.information = 'Nenhum formulário adicionado';
        }).catch(function () {
          self.groups = [];
          // TODO: Onde está informação será exibida?
          // TODO: QUem sabe trocar para um $mdToast?
          self.information = 'Erro de comunicação com servidor';
        });
    }

    function addNewGroup() {
      SurveyGroupConfigurationService.addNewGroup(self.newGroup)
        .then(function () {
          _getListOfSurveyGroups();
        }).catch(function () {
          // TODO: O que deve ser realizando quando ocorrer um erro?
        });
    }

    function edit(group) {
      group.editMode = !group.editMode;
    }

    function update(group) {
      SurveyGroupConfigurationService.editGroup(group)
        .then(function () {
          // TODO: O que deve ser realizado quando obtiver sucesso?
          _getListOfSurveyGroups();
        }).catch(function () {
          // TODO: O que deve ser realizando quando ocorrer um erro?
        });
    }

    function deleteGroup(group) {
      $mdDialog.show($mdDialog.confirm()
        .title('Exclusão do grupo')
        .textContent('Você tem certeza que deseja excluir esse grupo?')
        .ariaLabel('exclusão do grupo')
        .ok('Sim')
        .cancel('Não')).then(function () {
          SurveyGroupConfigurationService.deleteGroup(group).then(function () {
            _getListOfSurveyGroups();
            $mdToast.show($mdToast.simple().textContent('O grupo foi excluído.').hideDelay(2000));
          }).catch(function () {
            $mdToast.show($mdToast.simple().textContent('Ocorreu um erro. tente novamente mais tarde.').hideDelay(2000));
          });
        }).catch(function () {

        });
    }
  }
}());