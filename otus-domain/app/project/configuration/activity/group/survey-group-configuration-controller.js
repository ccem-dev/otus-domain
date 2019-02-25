(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .controller('surveyGroupConfigurationCtrl', Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;
    self.newGroup = '';
    self.groups = [
      { name: 'group_1' },
      { name: 'group_2' }
    ];

    /* Public methods */
    self.$onInit = onInit;
    self.addNewGroup = addNewGroup;
    self.editGroup = editGroup;
    self.deleteGroup = deleteGroup;

    function onInit() {
      _getListOfSurveyGroups();
      _buildDialogs();
    }

    function _getListOfSurveyGroups() {
      ProjectConfigurationService.getListOfSurveyGroups()
        .then(function (data) {
          self.groups = data;
          if (self.groups.length === 0)
            self.information = 'Nenhum formulário adicionado';
        })
        .catch(function () {
          self.groups = [];
          self.information = 'Erro de comunicação com servidor';
        });
    }

    function addNewGroup(group) {
      ProjectConfigurationService.addNewGroup(group)
        .then(function () {
          // TODO: O que deve ser realizado quando obtiver sucesso?
          _getListOfSurveyGroups();
        })
        .catch(function () {
          // TODO: O que deve ser realizando quando ocorrer um erro?
        });
    }

    function editGroup(group) {

    }

    function deleteGroup(group, index) {
      $mdDialog.show(deleteConfirmDialog).then(function () {
        ProjectConfigurationService.deleteGroup(group)
          .then(function () {
            self.surveyTemplatesList.splice(index, 1);
            $mdToast.show($mdToast.simple().textContent('Excluído').hideDelay(2000));
          })
          .catch(function () {
            $mdToast.show($mdToast.simple().textContent('Erro ao excluir').hideDelay(2000));
          });
      }, function () { });
    }

    function _buildDialogs() {
      deleteConfirmDialog = $mdDialog.confirm()
        .title('Exclusão do grupo')
        .textContent('Você tem certeza que deseja excluir esse grupo?')
        .ariaLabel('exclusão do grupo')
        .ok('Sim')
        .cancel('Não');
    }
  }
}());