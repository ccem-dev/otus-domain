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
    'SurveyFactory',
    'otusjs.otus-domain.project.configuration.ProjectConfigurationService',
  ];

  function Controller($mdToast, LoadingScreenService, ActivityConfigurationManagerService, ActivityPermissionFactory, SurveyFactory, ProjectConfigurationService) {
    var USER_ADD = "Usuário adicionado com sucesso.";
    var USER_DEL = "Usuário removido com sucesso.";
    var DELAY = 2000;
    var self = this;
    self.users;
    self.AllUsers;
    self.versions;
    self.usersList;
    self.surveyTemplatesList;

    /* Public methods */
    self.$onInit = onInit;
    self.querySearch = querySearch;
    self.saveSettings = saveSettings;
    self.downloadTemplate = downloadTemplate;
    self.downloadVariables = downloadVariables;
    self.transformChip = transformChip;
    self.onAdd = onAdd;
    self.onRemove = onRemove;

    function onInit() {
      self.users = [];
      self.AllUsers = [];
      self.versions = [];
      self.usersList = [];
      self.surveyTemplatesList = [];
      self.currentSurvey = ActivityConfigurationManagerService.getSurveyOfContext();
      self.permission = ActivityConfigurationManagerService.getPermissionOfContext();
      _getUsers();
      _getSurveyVersions();
      _getSurveyTemplates();
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

    function downloadTemplate(version) {
      if (version) {
        var survey = self.surveyTemplatesList.find(function (survey) {
          if (survey.version === version)
            return survey;
        });
        // TODO: download do template
      } else {
        // TODO: download do template
      }
    }

    function downloadVariables(version) {
      if (version) {
        var survey = self.surveyTemplatesList.find(function (survey) {
          if (survey.version === version)
            return survey;
        });
        var dictionary = SurveyFactory.createDictionary(survey.surveyTemplate);
        var headers = '[aliquot] AS [Alíquota], [transported] AS [Transportada], [prepared] AS [Preparada]';
        var acronym = self.currentSurvey.surveyTemplate.identity.acronym;
        var name = acronym + "-".concat(version);
        alasql('SELECT ' + headers + ' INTO CSV("' + name + '.csv") FROM ? ', [dictionary]);

      } else {
        var dictionary = SurveyFactory.createDictionary(self.currentSurvey.surveyTemplate);
        var headers = '[aliquot] AS [Alíquota], [transported] AS [Transportada], [prepared] AS [Preparada]';
        var acronym = self.currentSurvey.surveyTemplate.identity.acronym;
        var name = acronym + "-".concat(version);
        alasql('SELECT ' + headers + ' INTO CSV("' + name + '.csv") FROM ? ', [dictionary]);
        console.log(dictionary);
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

    function _getSurveyVersions() {
      var acronym = self.currentSurvey.surveyTemplate.identity.acronym;
      ProjectConfigurationService.getSurveyVersions(acronym)
        .then(function (data) {
          self.versions = data;
          // TODO: remover!
          var _data = [
            2,
            1
          ];
          self.versions = _data;
        }).catch(function () {
          // TODO: exibir mensagem de erro ao tentar carregar informações!
        });
    }

    function _getSurveyTemplates() {
      LoadingScreenService.start();
      var acronym = self.currentSurvey.surveyTemplate.identity.acronym;
      ProjectConfigurationService.getSurveyTemplatesByAcronym(acronym)
        .then(function (data) {
          // self.surveyTemplatesList.push(data);

          // TODO: remover!
          self.surveyTemplatesList = data;

          LoadingScreenService.finish();
        }).catch(function () {
          // TODO: exibir mensagem de erro ao tentar carregar informações!
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
