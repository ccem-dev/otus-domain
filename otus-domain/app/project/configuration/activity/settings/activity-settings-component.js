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
    'otusDomain.rest.configuration.ProjectConfigurationService',
    'otusDomain.dashboard.business.SurveyTemplateTranslateService',
    '$mdDialog',
    '$mdSelect',
    'ActivitySettingsService',
    'ActivityReportDialogService'
  ];

  function Controller($mdToast, LoadingScreenService, ActivityConfigurationManagerService, ActivityPermissionFactory, SurveyFactory,
                      ProjectConfigurationService, SurveyTemplateTranslateService, $mdDialog, $mdSelect, ActivitySettingsService,
                      ActivityReportDialogService) {

    const GENERIC_ERROR = 'Não foi possível apresentar os dados. Por favor, tente novamente em alguns minutos.';
    var USER_ADD = "Usuário adicionado com sucesso.";
    var USER_DEL = "Usuário removido com sucesso.";
    var DELAY = 2000;
    var self = this;
    self.error;
    self.users;
    self.message;
    self.AllUsers;
    self.versions;
    self.usersList;
    self.surveyTemplatesList;
    self.persistentActivityReport;

    /* Public methods */
    self.$onInit = onInit;
    self.querySearch = querySearch;
    self.saveSettings = saveSettings;
    self.downloadTemplate = downloadTemplate;
    self.downloadVariables = downloadVariables;
    self.transformChip = transformChip;
    self.onAdd = onAdd;
    self.onRemove = onRemove;
    self.deleteReport = deleteReport;
    self.updateSelectVersion = updateSelectVersion;
    self.cancelSelectVersion = cancelSelectVersion;
    self.loadActivityReport = loadActivityReport;
    self.loadActivityReportList = loadActivityReportList;

    function onInit() {
      self.error = false;
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

      self.activityReportList = [];
      self.outOfReportVersionList = [];
      self.persistentActivityReport = false;
      self.loadActivityReportList(self.currentSurvey.surveyTemplate.identity.acronym);
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
      var acronym = self.currentSurvey.surveyTemplate.identity.acronym;
      var name = '' + acronym;
      var downloadElement = document.createElement('a');
      if (version) {
        var survey = self.surveyTemplatesList.find(function (survey) {
          if (survey.version === version)
            return survey;
        });
        name = name.concat(version);
        downloadElement.setAttribute('href', _exportSurvey(JSON.stringify(survey.surveyTemplate)));
      } else {
        downloadElement.setAttribute('href', _exportSurvey(JSON.stringify(self.currentSurvey.surveyTemplate)));
        name = name.concat(self.currentSurvey.version);
      }
      downloadElement.setAttribute('download', name + '.json');
      downloadElement.setAttribute('target', '_blank');
      downloadElement.click();
    }

    function downloadVariables(version) {
      var headers = '[acronym] AS [SIGLA], [extractionID] AS [ID_DA_QUESTAO], [objectType] AS [TIPO_DA_QUESTAO], [extractionValues] AS [VALORES_DE_EXTRACAO], [label] AS [LABEL], [metadata] AS [METADADOS], [validationTypes] AS [VALIDACOES]';
      var acronym = self.currentSurvey.surveyTemplate.identity.acronym;
      var name = 'dicionario-de-variaveis_' + acronym;
      if (version) {
        var survey = self.surveyTemplatesList.find(function (survey) {
          if (survey.version === version)
            return survey;
        });
        var dictionary = SurveyTemplateTranslateService.translate(SurveyFactory.createDictionary(survey.surveyTemplate));
        name = name.concat(version + '_');
        name = name.concat(new Date().toLocaleDateString());
        alasql('SELECT ' + headers + ' INTO CSV("' + name + '.csv") FROM ? ', [dictionary]);
      } else {
        var dictionary = SurveyTemplateTranslateService.translate(SurveyFactory.createDictionary(self.currentSurvey.surveyTemplate));
        name = name.concat(self.currentSurvey.version + '_');
        name = name.concat(new Date().toLocaleDateString());
        alasql('SELECT ' + headers + ' INTO CSV("' + name + '.csv") FROM ? ', [dictionary]);
      }
    }

    function transformChip(chip) {
      if (angular.isObject(chip)) {
        return chip;
      }
      return {name: chip, type: 'new'};
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
      let acronym = self.currentSurvey.surveyTemplate.identity.acronym;
      ProjectConfigurationService.getSurveyVersions(acronym)
        .then(function (data) {
          self.versions = data;
        })
        .catch(function () {
          self.error = true;
          self.message = GENERIC_ERROR;
        });
    }

    function _getSurveyTemplates() {
      LoadingScreenService.start();
      var acronym = self.currentSurvey.surveyTemplate.identity.acronym;
      ProjectConfigurationService.getSurveyTemplatesByAcronym(acronym)
        .then(function (data) {
          self.surveyTemplatesList = data;
          LoadingScreenService.finish();
        }).catch(function () {
        self.error = true;
        self.message = GENERIC_ERROR;
        LoadingScreenService.finish();
      });
    }

    function _constructorUsers(users) {
      users.forEach(function (user) {
        self.AllUsers.push({name: user.name, email: user.email})
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

    function _exportSurvey(JsonTemplate) {
      return 'data:text/json;charset=utf-8,' + encodeURIComponent(JsonTemplate);
    }

    function loadActivityReportList(acronym) {
      _cleanCollections();
      ProjectConfigurationService.getActivityReports(acronym)
        .then(activityReports => self.activityReportList = ActivitySettingsService.getActivityReports(activityReports))
        .then(() => _getSurveyVersions())
        .then(() => _loadListOfOutOfReportVersions(self.versions))
        .then(() => self.persistentActivityReport = true)
        .catch(() => self.persistentActivityReport = false);
    }

    function _loadListOfOutOfReportVersions(activityVersions) {
      if (self.activityReportList.length) {
        let candidateReportVersions = angular.copy(activityVersions);
        self.activityReportList.forEach(report => {
          report.versions.forEach(reportVersion => {
            let index = candidateReportVersions.indexOf(reportVersion);
            if (index !== -1) candidateReportVersions.splice(index, 1);
          })
        });
        self.activityVersionsAvailable = candidateReportVersions;
      }
    }

    function _showAlert(report) {
      let versionCandidates = report.versions;

      if (versionCandidates.length) {
        let confirm = $mdDialog.confirm()
          .title('Deseja confirmar as seguintes alterações no relatório ?')

          .htmlContent(` 
                         <md-content>
                            <p class="md-subhead">Atual: [${report.getCurrentVersions()}]</p>
                            <p class="md-subhead">Modificado: [${versionCandidates}]</p> 
                         </md-content>
                         `)
          .ok('SIM')
          .cancel('NÃO');

        $mdDialog.show(confirm).then(() => {
          ProjectConfigurationService.updateActivityReport(report.id, versionCandidates)
            .then(() => _toastCalled("Versões Atualizadas"))
            .then(() => loadActivityReportList(self.currentSurvey.surveyTemplate.identity.acronym))
        });
      } else {
        _toastCalled("Não é permitido relatório sem versão");
      }
    }

    function _toastCalled(message) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(message)
          .hideDelay(4000)
      );
    }

    function _cleanCollections() {
      self.activityReportList = [];
      self.activityVersionsAvailable = [];
    }

    function updateSelectVersion(report) {
      _showAlert(report);
      $mdSelect.destroy();
    }

    function cancelSelectVersion(report) {
      if (report) report.cancelUpdateVersion();
      $mdSelect.cancel();
    }

    function deleteReport(report) {
      let confirm = $mdDialog.confirm()
        .title('Você tem certeza que deseja excluir este RELATÓRIO?')
        .htmlContent(`<md-content>                         
                         <p class="md-subhead">Titulo: ${report.label}</p>
                         <p class="md-subhead">Versões: [${report.versions}]</p> 
                      </md-content>`)
        .ariaLabel('delete confirmation')
        .ok('SIM')
        .cancel('NÃO');

      $mdDialog.show(confirm).then(() => {
        ProjectConfigurationService.deleteActivityReport(report.id)
          .then(() => loadActivityReportList(self.currentSurvey.surveyTemplate.identity.acronym))
      });
    }

    function loadActivityReport() {
      if(!self.activityReportList.length) self.activityVersionsAvailable = self.versions;
        ActivityReportDialogService.loadActivityReport(self);
    }
  }

}());
