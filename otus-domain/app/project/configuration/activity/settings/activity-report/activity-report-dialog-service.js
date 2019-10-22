(function () {
  'use strict'

  angular
    .module('otusDomain.dashboard')
    .service('ActivityReportDialogService', Service);

  Service.$inject = [
    '$mdDialog',
    '$q',
    '$mdToast',
    'otusDomain.rest.configuration.ProjectConfigurationService'
  ];

  function Service($mdDialog, $q, $mdToast, ProjectConfigurationService) {
    const self = this;

    self.$onInit = onInit;
    self.loadActivityReport = loadActivityReport;

    function onInit() {

    }

    function loadActivityReport(ComponentCtrl){
      self.ComponentCtrl = ComponentCtrl;
      $mdDialog.show({
        controller: DialogController,
        controllerAs: '$ctrl',
        templateUrl: 'app/project/configuration/activity/settings/activity-report/activity-report-load-dialog-template.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true
      });
    }

    function DialogController($mdDialog) {
      const vm = this;
      vm.uploadButtonState = false;
      vm.activityVersionsAvailable = self.ComponentCtrl.activityVersionsAvailable;

      vm.publishReport = publishReport;



      vm.cancel = function() {
        $mdDialog.cancel();
      };

      vm.uploadConfig = {
        'callback': uploadFile,
        'type': 'json'
      };

      vm.uploadedObject = {};
      vm.uploadedFile = {};

      function uploadFile(fileList) {
        fileList.forEach(function (file) {
          if (fileList[0].name.split('.')[1] === 'json') {
            _fileParser(file).then(function (templateObject) {
              self.uploadedObject = JSON.parse(templateObject);
              self.uploadedObject.versions = vm.availableVersions;
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
        if(self.uploadedObject.acronym !== acronym){
          _toastCalled("Relatório pertence a outra atividade");
          vm.cancel();
          throw new Error('report with different acronym');
        }

        ProjectConfigurationService.publishActivityReport(self.uploadedFile)
          .then(() => _toastCalled("Relatório Adicionado"))
          .then(() => self.ComponentCtrl.loadActivityReportList(acronym))
          .catch(() => _toastCalled("Ocorreu um erro interno: Relatório não foi adicionado"))
          .then(()=> vm.cancel());
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