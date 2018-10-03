(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('activitySettings', {
      controller: Controller,
      templateUrl: 'app/project/configuration/activity/settings/activity-settings-template.html'
    });

  Controller.$inject = [
    'otusjs.otus-domain.project.configuration.ProjectConfigurationService',
    '$mdToast',
    'ActivityConfigurationManagerService'
  ];

  function Controller(ProjectConfigurationService, $mdToast, ActivityConfigurationManagerService) {
    const ERROR_MESSAGE = 'Ocorreu algum problema, tente novamente mais tarde';
    var timeShowMsg = 5000;
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

    function saveSettings() {
      if(!self.permission._id){
        ProjectConfigurationService.setUsersExclusiveDisjunction(self.permission).then(function (response) {
          _showMessage('Configurações atualizadas.', 2000);
        }).catch(function (err) {
          _showMessage('Não foi possível atualizar configurações',3000);
        });
      } else {
        ProjectConfigurationService.updateUsersExclusiveDisjunction(self.permission).then(function (response) {
          _showMessage('Configurações atualizadas.', 2000);
        }).catch(function (err) {
          _showMessage('Não foi possível atualizar configurações',3000);
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
      saveSettings();
    }

    function onRemove(user) {
      self.permission.removeUser(user.email);
      saveSettings();
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