(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('activitySettings', {
      controller: "activitySettingsCtrl as $ctrl",
      templateUrl: 'app/project/configuration/activity/settings/activity-settings-template.html'
    }).controller("activitySettingsCtrl", Controller);

  Controller.$inject = [
    'otusjs.otus-domain.project.configuration.ProjectConfigurationService',
    '$mdToast',
    'ActivityConfigurationManagerService'
  ];

  function Controller(ProjectConfigurationService, $mdToast, ActivityConfigurationManagerService) {
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
      self.users= [];
      self.AllUsers= [];
      self.permission = ActivityConfigurationManagerService.getSurveyToSettings()
      ProjectConfigurationService.fetchUsers().then(function (users) {
        _constructorUsers(users);
        self.permission.exclusiveDisjunction.forEach(function (email) {
          self.AllUsers.forEach(function (user) {
            if (user.email === email){
              self.users.push(user);
            }
          })
        })
      });
    }

    function _showMessage(msg, time) {
      $mdToast.show($mdToast.simple().textContent(msg).position('right bottom').hideDelay(time));
    }

    function saveSettings(MSG) {
      if(!self.permission._id){
        ProjectConfigurationService.setUsersExclusiveDisjunction(self.permission).then(function (response) {
          _showMessage(MSG, DELAY);
        }).catch(function (err) {
          _showMessage('Não foi possível atualizar configurações',DELAY);
        });
      } else {
        ProjectConfigurationService.updateUsersExclusiveDisjunction(self.permission).then(function (response) {
          _showMessage(MSG, DELAY);
        }).catch(function (err) {
          _showMessage('Não foi possível atualizar configurações',DELAY);
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

    function _constructorUsers(users) {
      users.forEach(function (user) {
        self.AllUsers.push({name:user.name,email: user.email})
      });
    }

    function querySearch (criteria) {
      return criteria ? self.AllUsers.filter(createFilterFor(criteria)) : [];
    }

    function createFilterFor(query) {
      var lowercaseQuery = query.toLowerCase();
      return function filterFn(user) {
        return (user.name.toLowerCase().indexOf(lowercaseQuery) !== -1);
      };
    }


  }
}());
