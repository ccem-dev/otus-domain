(function () {
  'use strict'

  angular
    .module('otusDomain.dashboard')
    .service('ActivityReportDialogService', Service);

  Service.$inject = ['$mdDialog'];

  function Service($mdDialog) {
    const self = this;

    self.$onInit = onInit;
    self.loadActivityReport = loadActivityReport;

    function onInit() {

    }

    function loadActivityReport(ev){
      console.log("service da dialog")
      $mdDialog.show({
        controller: DialogController,
        controllerAs: '$ctrl',
        templateUrl: 'app/project/configuration/activity/settings/activity-report-load-dialog-template.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
        .then(function(answer) {
          self.status = 'You said the information was "' + answer + '".';
        }, function() {
          self.status = 'You cancelled the dialog.';
        });

    }

    function DialogController($mdDialog) {
      const vm = this;
      vm.hide = function() {
        $mdDialog.hide();
      };

      vm.cancel = function() {
        console.log("tst cancel")
        $mdDialog.cancel();
      };

      vm.answer = function(answer) {
        $mdDialog.hide(answer);
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
              self.uploadedFile = templateObject;
            })
              //.then(() => _publishReport())
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

    }

  }

})();