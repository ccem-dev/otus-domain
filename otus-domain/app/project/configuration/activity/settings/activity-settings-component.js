(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('activitySettings', {
      controller: "activitySettingsCtrl as $ctrl",
      templateUrl: 'app/project/configuration/activity/settings/activity-settings-template.html'
    }).controller("activitySettingsCtrl", Controller);

  Controller.$inject = [
    '$mdToast',
    'otusDomain.LoadingScreenService',
    'ActivityConfigurationManagerService',
    'otusjs.model.activity.ActivityPermissionFactory',
    'otusjs.otus-domain.project.configuration.ProjectConfigurationService'
  ];

  function Controller($mdToast, LoadingScreenService, ActivityConfigurationManagerService, ActivityPermissionFactory, ProjectConfigurationService) {
    var USER_ADD = "Usuário adicionado com sucesso.";
    var USER_DEL = "Usuário removido com sucesso.";
    var DELAY = 2000;
    var self = this;
    self.surveyTemplatesList = [];
    self.usersList = [];

    /* Public methods */
    self.$onInit = onInit;
    self.querySearch = querySearch;
    self.saveSettings = saveSettings;
    self.transformChip = transformChip;
    self.onAdd = onAdd;
    self.onRemove = onRemove;

    function onInit() {
      self.users = [];
      self.AllUsers = [];
      self.permission = ActivityConfigurationManagerService.getSurveyToSettings();
      _getUsers();
      _getTemplatesList();
    }

    function saveSettings(MSG) {
      if (!self.permission._id) {
        ProjectConfigurationService.setUsersExclusiveDisjunction(self.permission).then(function (data) {
          ProjectConfigurationService.getCollectionOfPermissions().then(function (response) {
            self.permissionList = angular.copy(response);
            _filterUsersWithPermissionExclusiveDisjunction();
          });
          _showMessage(MSG, DELAY);
        }).catch(function (err) {
          _showMessage('Não foi possível atualizar configurações', DELAY);
        });
      } else {
        ProjectConfigurationService.updateUsersExclusiveDisjunction(self.permission).then(function (response) {
          _showMessage(MSG, DELAY);
        }).catch(function (err) {
          _showMessage('Não foi possível atualizar configurações', DELAY);
        });
      }
    }

    function transformChip(chip) {
      if (angular.isObject(chip)) {
        return chip;
      }
      return { name: chip, type: 'new' };
    }

    function onAdd(user) {
      self.permission.addUser(user.email);
      saveSettings(USER_ADD);
    }

    function onRemove(user) {
      self.permission.removeUser(user.email);
      saveSettings(USER_DEL);
    }

    function querySearch(criteria) {
      return criteria ? self.AllUsers.filter(createFilterFor(criteria)) : [];
    }

    function createFilterFor(query) {
      var lowercaseQuery = query.toLowerCase();
      return function filterFn(user) {
        return (user.name.toLowerCase().indexOf(lowercaseQuery) !== -1);
      };
    }

    function _getUsers() {
      ProjectConfigurationService.fetchUsers().then(function (users) {
        _constructorUsers(users);
        self.permission.exclusiveDisjunction.forEach(function (email) {
          self.AllUsers.forEach(function (user) {
            if (user.email === email) {
              self.users.push(user);
            }
          })
        })
      });
    }

    function _getTemplatesList() {
      LoadingScreenService.start();
      ProjectConfigurationService.fetchSurveysManagerConfiguration()
        .then(function (data) {
          self.surveyTemplatesList = data;
          if (self.surveyTemplatesList.length === 0) {
            self.noListInfo = 'Nenhum formulário adicionado';
          } else {
            self.noListInfo = '';
          }
          LoadingScreenService.finish();
        }).catch(function () {
          self.surveyTemplatesList = [];
          self.noListInfo = 'Erro de comunicação com servidor';
          LoadingScreenService.finish();
        });
    }

    function _constructorUsers(users) {
      users.forEach(function (user) {
        self.AllUsers.push({ name: user.name, email: user.email })
      });
    }

    function _filterUsersWithPermissionExclusiveDisjunction() {
      self.permissionList.forEach(function (permission) {
        if (permission.acronym === self.permission.acronym && permission.version == self.permission.version) {
          self.permission = ActivityPermissionFactory.fromJsonObject(permission);
        }
      });
    }

    function _showMessage(msg, time) {
      $mdToast.show($mdToast.simple().textContent(msg).position('right bottom').hideDelay(time));
    }

  }
}());
