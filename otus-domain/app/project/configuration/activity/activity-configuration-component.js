(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('activityConfiguration', {
      controller: Controller,
      templateUrl: 'app/project/configuration/activity/activity-configuration-template.html'
    });

  Controller.$inject = [
    '$q',
    'otusjs.otus-domain.project.configuration.ProjectConfigurationService',
    '$mdToast',
    '$mdDialog'
  ];

  function Controller($q, ProjectConfigurationService, $mdToast, $mdDialog) {
    var self = this;
    var deleteConfirmDialog;

    const ERROR_MESSAGE = 'Ocorreu algum problema, tente novamente mais tarde';
    var timeShowMsg = 5000;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    getCollectionOfPermissions();

    function onInit() {
      _getTemplatesList();
      deleteConfirmDialog = $mdDialog.confirm()
        .title('Exclusão de Formulário')
        .textContent('Você tem certeza que deseja excluir esse Formulário?')
        .ariaLabel('exclusão de formulário')
        .ok('Sim')
        .cancel('Não');    }


    self.surveyTemplatesList = [];
    self.usersList = [];


    /* Public Interface*/
    self.publishTemplate = publishTemplate;
    self.updateSurveyFormType = updateSurveyFormType;
    self.deleteSurveyTemplate = deleteSurveyTemplate;
    self.uploadConfig = {
      'callback': uploadFile,
      'type': 'json'
    };

    self.uploadedObject = {};
    self.uploadedFile = {};
    self.disableSaving = true;

    // function _getTemplatesList() {
    //   ProjectConfigurationService.fetchSurveysManagerConfiguration()
    //     .then(function (data) {
    //       self.surveyTemplatesList = data;
    //     }).catch(function () {
    //     self.surveyTemplatesList = [];
    //     $mdToast.show($mdToast.simple().textContent(ERROR_MESSAGE).hideDelay(timeShowMsg));
    //   });
    // }


    function _getTemplatesList() {
      ProjectConfigurationService.fetchSurveysManagerConfiguration()
        .then(function(data) {
          self.surveyTemplatesList = data;
          if (self.surveyTemplatesList.length === 0) {
            self.noListInfo = 'Nenhum formulário adicionado';
          } else {
            self.noListInfo = '';
          }
        })
        .catch(function() {
          self.surveyTemplatesList = [];
          self.noListInfo = 'Erro de comunicação com servidor';
        });
    }

    function uploadFile(fileList) {
      fileList.forEach(function(file) {
        if (fileList[0].name.split('.')[1] === 'json') {
          fileParser(file).then(function(templateObject) {
            self.uploadedObject = JSON.parse(templateObject);
            self.uploadedFile = templateObject;
            self.disableSaving = false;
          });
        }
      });
    }

    function fileParser(file) {
      var deferred = $q.defer();
      var reader = new FileReader();
      reader.onload = function() {
        deferred.resolve(reader.result);
      };
      reader.readAsText(file);
      return deferred.promise;
    }

    function deleteSurveyTemplate(index) {
      $mdDialog.show(deleteConfirmDialog).then(function() {
        ProjectConfigurationService.deleteSurveyTemplate(self.surveyTemplatesList[index].surveyTemplate.identity.acronym)
          .then(function() {
            self.surveyTemplatesList.splice(index, 1);
            $mdToast.show($mdToast.simple().textContent('Excluído').hideDelay(2000));
          })
          .catch(function() {
            $mdToast.show($mdToast.simple().textContent('Erro ao excluir').hideDelay(2000));
          });
      }, function() {});

    }

    function updateSurveyFormType(index) {
      var selectedAcronym = self.surveyTemplatesList[index].surveyTemplate.identity.acronym;
      var newType = self.surveyTemplatesList[index].surveyFormType;
      ProjectConfigurationService.updateSurveyTemplateType({
        'acronym': selectedAcronym,
        'type': newType
      })
        .then(function() {
          $mdToast.show($mdToast.simple().textContent('Alterado com sucesso').hideDelay(2000));

        })
        .catch(function() {
          $mdToast.show($mdToast.simple().textContent('Erro ao alterar.').hideDelay(2000));
          if (newType === 'PROFILE') {
            self.surveyTemplatesList[index].surveyFormType = 'FORM_INTERVIEW';
          } else {
            self.surveyTemplatesList[index].surveyFormType = 'PROFILE';
          }
        });
    }

    function publishTemplate() {
      ProjectConfigurationService.publishTemplate(self.uploadedFile)
        .then(function(surveyTemplate) {
          successfullPublishCallback(surveyTemplate);
        })
        .catch(function(message) {
          publishFailureMessenger(message);
        });
    }

    function getCollectionOfPermissions() {
      ProjectConfigurationService.getCollectionOfPermissions()
        .then(function (permissions) {
          console.log(permissions)
          self.permissionList = angular.copy(permissions);
        })
    }

    function successfullPublishCallback(surveyTemplate) {
      self.uploadedObject = {};
      self.uploadedFile = {};
      self.disableSaving = true;
      self.surveyTemplatesList.push(surveyTemplate);
      $mdToast.show($mdToast.simple().textContent('Upload realizado com sucesso'));
    }

    function publishFailureMessenger(message) {
      var errorMessage = '';
      switch (message) {
        case 'Acronym Already Exists':
          errorMessage += 'Já existe um formulário com esta sigla';
          break;
        case 'ID Already Exists':
          errorMessage += 'Ids de questões conflitam com as de formulários já existentes';
          break;
        default:
          errorMessage += 'Erro ao enviar';

      }
      $mdToast.show($mdToast.simple().textContent(errorMessage).hideDelay(2000));
    }
  }
}());