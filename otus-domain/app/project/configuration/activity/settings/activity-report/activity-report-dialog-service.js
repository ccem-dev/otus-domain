(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .service('ActivityReportDialogService', Service);

  Service.$inject = [
    '$mdDialog',
    '$q',
    '$mdToast',
    'otusDomain.rest.configuration.ProjectConfigurationService',
    '$mdSelect'
  ];

  function Service($mdDialog, $q, $mdToast, ProjectConfigurationService, $mdSelect) {
    const self = this;
    const UPLOAD_REPORT_MESSAGES = {
      addSuccess:"Relatório Adicionado",
      addFail: "Ocorreu um erro interno: Relatório não foi adicionado",
      acronymInvalid: "Relatório pertence a outra atividade",
      acronymInvalidError:"report with different acronym"


    }

    self.loadActivityReport = loadActivityReport;

    function loadActivityReport(ComponentCtrl) {
      self.ComponentCtrl = ComponentCtrl;
      $mdDialog.show({
        controller: DialogController,
        controllerAs: '$ctrl',
        templateUrl: 'app/project/configuration/activity/settings/activity-report/activity-report-load-dialog-template.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true
      });
    }

    function DialogController($mdDialog) {
      const vm = this;
      vm.activityVersionsAvailable = self.ComponentCtrl.activityVersionsAvailable;
      vm.uploadButtonState = false;
      vm.uploadedObject = {};
      vm.uploadedFile = {};
      vm.uploadConfig = {
        'callback': uploadFile,
        'type': 'json'
      };

      vm.publishReport = publishReport;
      vm.cancel = cancel;
      vm.skipSelect = skipSelect;

      function cancel() {
        $mdDialog.cancel();
      }

      function skipSelect() {
        $mdSelect.destroy();
      }

      function uploadFile(fileList) {
        fileList.forEach(function (file) {
          if (fileList[0].name.split('.')[1] === 'json') {
            _fileParser(file).then(function (templateObject) {
              self.uploadedObject = JSON.parse(templateObject);
              self.uploadedObject.versions = vm.availableVersions;
              self.uploadedObject.sendingDate = new Date().toISOString();
              self.uploadedFile = JSON.stringify(self.uploadedObject);
            }).then(() => vm.uploadButtonState = true)
          }
        });
      }

      function _fileParser(file) {
        var deferred = $q.defer();
        var reader = new FileReader();
        reader.onload = function () {
          deferred.resolve(reader.result);
        };
        reader.readAsText(file);
        return deferred.promise;
      }

      function publishReport() {
        let acronym = self.ComponentCtrl.currentSurvey.surveyTemplate.identity.acronym;
        if (self.uploadedObject.acronym !== acronym) {
          _toastCalled(UPLOAD_REPORT_MESSAGES.acronymInvalid);
          vm.cancel();
          throw new Error(UPLOAD_REPORT_MESSAGES.acronymInvalidError);
        }

        ProjectConfigurationService.publishActivityReport(self.uploadedFile)
          .then(() => _toastCalled(UPLOAD_REPORT_MESSAGES.addSuccess))
          .then(() => self.ComponentCtrl.loadActivityReportList(acronym))
          .catch(() => _toastCalled(UPLOAD_REPORT_MESSAGES.addFail))
          .then(() => vm.cancel());
      }

      function _toastCalled(message) {
        $mdToast.show(
          $mdToast.simple()
            .textContent(message)
            .hideDelay(4000)
        );
      }

    }
  }

})();