(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('surveyTemplateConfiguration', {
      controller: Controller,
      templateUrl: 'app/project/configuration/activity/survey-template/survey-template-configuration-template.html',
      bindings: {
        surveyForm: '<',
        surveyTemplates: '='
      }
    });

  Controller.$inject = [
    'otusjs.otus-domain.project.configuration.ProjectConfigurationService',
    'UserManagerFactory',
    '$mdDialog',
    '$mdToast'
  ];

  function Controller(ProjectConfigurationService, UserManagerFactory, $mdDialog, $mdToast) {
    const ERROR_MESSAGE = 'Ocorreu algum problema, tente novamente mais tarde';
    var timeShowMsg = 5000;
    var _userManager;
    var _deleteConfirmDialog;
    var _permissionList = [];
    var _allUsersList = [];
    var self = this;
    self.showSettings;
    self.usersList = [];

    /* Public methods */
    self.$onInit = onInit;
    self.showActivitySettings = showActivitySettings;
    self.deleteSurveyTemplate = deleteSurveyTemplate;
    self.onModelChange = onModelChange;
    self.querySearch = querySearch;

    function onInit() {
      self.showSettings = false;
      _dialogs();
    }

    function showActivitySettings() {
      // self.showSettings === false ? true : false;
      self.showSettings = true;
      _getAllUsers();
      _getCollectionOfPermissions();
      _filterUsersWithPermissionExclusiveDisjunction();
    }

    // TODO:
    function deleteSurveyTemplate() {
      $mdDialog.show(_deleteConfirmDialog).then(function () {
        var current = self.surveyTemplates.filter(function (current, index) {
          if (current.surveyTemplate.identity.acronym === self.surveyForm.surveyTemplate.identity.acronym && current.version === self.surveyForm.version) {
            return current;
          }
        });

        ProjectConfigurationService.deleteSurveyTemplate(acronym)
          .then(function () {
            self.surveyTemplates.splice(index, 1);
            $mdToast.show($mdToast.simple().textContent('Template excluído com sucesso').hideDelay(timeShowMsg));
          })
          .catch(function () {
            $mdToast.show($mdToast.simple().textContent(ERROR_MESSAGE).hideDelay(timeShowMsg));
          });
      }, function () { });
    }

    function onModelChange(user) {
      // TODO: Neste momento deve ser chamado o modelo para criar o objeto
      var permission = {
        'objectType': 'ActivityPermission',
        'acronym': self.surveyForm.surveyTemplate.identity.acronym,
        'version': self.surveyForm.version,
        'exclusiveDisjunction': users
      }
      ProjectConfigurationService.setUsersExclusiveDisjunction(permission)
        .then(function () {
          // TODO:
          $mdToast.show($mdToast.simple().textContent('Usuário(s) atualizado(s) com sucesso').hideDelay(timeShowMsg));
        })
        .catch(function () {
          $mdToast.show($mdToast.simple().textContent(ERROR_MESSAGE).hideDelay(timeShowMsg));
        });
    }

    function querySearch(criteria) {
      var list = _ignoreAlreadySelectedUsers();
      return criteria ? list.filter(_createFilterFor(criteria)) : [];
    }

    function _createFilterFor(query) {
      var lowercaseQuery = query.toLowerCase();
      return function filterFn(user) {
        return (user.email.indexOf(lowercaseQuery) !== -1);
      };
    }

    function _ignoreAlreadySelectedUsers() {
      var list = [];
      self.usersList.filter(function (alreadyRegistered) {
        _allUsersList.filter(function (user) {
          if (user.email !== alreadyRegistered.email) {
            list.push(user);
          }
        });
      });
      return list;
    }

    // TODO: Problema na exibição
    function _filterUsersWithPermissionExclusiveDisjunction() {
      var permission = _permissionList.find(function (permission) {
        if (permission.acronym === self.surveyForm.surveyTemplate.identity.acronym && permission.version == self.surveyForm.version) {
          permission.exclusiveDisjunction.filter(function (email) {
            _allUsersList.filter(function (user) {
              if (user.email === email) {
                self.usersList.push(user);
              }
            });
          });
        }
      });
    }

    function _getCollectionOfPermissions() {
      ProjectConfigurationService.getCollectionOfPermissions()
        .then(function (data) {
          _permissionList = data;
        }).catch(function () {
          $mdToast.show($mdToast.simple().textContent(ERROR_MESSAGE).hideDelay(timeShowMsg));
        });
    }

    function _getAllUsers() {
      _userManager = UserManagerFactory.create(ProjectConfigurationService.getUserResource());
      _userManager.list().then(function (response) {
        if ('data' in response) {
          _allUsersList = response.data;
        } else {
          $mdToast.show($mdToast.simple().textContent('Ocorreu algum problema, tente novamente mais tarde').hideDelay(timeShowMsg));
        }
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