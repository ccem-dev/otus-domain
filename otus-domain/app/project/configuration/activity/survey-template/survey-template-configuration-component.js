(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('surveyTemplateConfiguration', {
      controller: Controller,
      templateUrl: 'app/project/configuration/activity/survey-template/survey-template-configuration-template.html',
      bindings: {
        surveyTemplateData: '<'
      }
    });

  Controller.$inject = [
    'otusjs.otus-domain.project.configuration.ProjectConfigurationService',
    '$mdDialog',
    '$mdToast'
  ];

  function Controller(ProjectConfigurationService, $mdDialog, $mdToast) {
    var _permissionList = [];
    var _deleteConfirmDialog;
    var self = this;
    self.showSettings;

    /* Public methods */
    self.$onInit = onInit;
    self.showActivitySettings = showActivitySettings;
    self.deleteSurveyTemplate = deleteSurveyTemplate;

    function onInit() {
      self.showSettings = false;
      _dialogs();
    }

    function showActivitySettings() {
      // self.showSettings === false ? true : false;
      self.showSettings = true;
      _getUsersList();
      _getCollectionOfPermissions();
      _filterUsersWithPermissionExclusiveDisjunction();
    }

    // TODO: Acabou parando de funcionar!
    function deleteSurveyTemplate(index) {
      $mdDialog.show(_deleteConfirmDialog).then(function () {
        ProjectConfigurationService.deleteSurveyTemplate(self.surveyTemplatesList[index].surveyTemplate.identity.acronym)
          .then(function () {
            self.surveyTemplatesList.splice(index, 1);
            $mdToast.show($mdToast.simple().textContent('Template excluído').hideDelay(2000));
          })
          .catch(function () {
            $mdToast.show($mdToast.simple().textContent('Ocorreu algum problema, tente novamente mais tarde').hideDelay(2000));
          });
      }, function () { });
    }

    function setUsersExclusiveDisjunction(users) {
      ProjectConfigurationService.setUsersExclusiveDisjunction(users)
        .then(function () {
          // TODO:
          $mdToast.show($mdToast.simple().textContent('Usuários atualizados com sucesso').hideDelay(2000));
        })
        .catch(function () {
          $mdToast.show($mdToast.simple().textContent('Ocorreu algum problema, tente novamente mais tarde').hideDelay(2000));
        });
    }

    function _getCollectionOfPermissions() {
      ProjectConfigurationService.getCollectionOfPermissions()
        .then(function (data) {
          console.log(data);
          // TODO:
        }).catch(function () {
          // TODO:
        });


      // TODO: Utilizado para realização de teste
      _permissionList = [{
        "_id": "5ba297053a55f6694cba663c",
        "objectType": "ActivityPermission",
        "version": 1,
        "acronym": "CSJ",
        "exclusiveDisjunction": [
          "vianna.emanoel@gmail.com",
          "pedro.silva@gmail.com"
        ]
      },
      {
        "_id": "5ba297053a55f6694cba663c",
        "objectType": "ActivityPermission",
        "version": 5,
        "acronym": "RCPC",
        "exclusiveDisjunction": [
          "vianna.emanoel@gmail.com",
          "pedro.silva@gmail.com"
        ]
      }]
    }

    // TODO:
    function _getUsersList() {
      self.usersList = ProjectConfigurationService.getUsersList();

      // TODO: Utilizado para realização de teste
      self.usersList = [{
        "_id": "5a29599b44824e71119a2adb",
        "password": "TXUEOePzmEg0XG73TvPXGeNOcRE=",
        "phone": "51999999999",
        "enable": true,
        "surname": "Vianna",
        "name": "Emanoel",
        "adm": true,
        "uuid": "83230951-49bb-4ad8-b566-6a1da3dc8282",
        "email": "vianna.emanoel@gmail.com",
        "fieldCenter": null,
        "extraction": true,
        "extractionToken": "4c28d25f-1feb-4fbf-9c77-2425c13a7e71",
        "extractionIps": []
      }]
    }

    function _filterUsersWithPermissionExclusiveDisjunction() {
      self.usersList = _permissionList.find(function (permission) {
        if (permission.acronym === self.surveyTemplateData.surveyTemplate.identity.acronym && permission.version === self.surveyTemplateData.version)
          return permission.exclusiveDisjunction;
      });
      console.log(self.usersList);
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