
(function () {
  'use strict';

  angular
    .module('otusDomain.project')
    .controller('dynamicDialogCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
    '$mdDialog',
    '$scope',
    '$location',
  ];

  function Controller($mdToast, $mdDialog, $scope, $location) {
    var self = this;

    self.DialogController = DialogController;
    self.showAdvanced = showAdvanced;

    function showAdvanced(ev) {
      _showDialog(ev)
    }

    function _showDialog(ev){
      $mdDialog.show({
        controller: DialogController,
        controllerAs: 'ctrl',
        templateUrl: self.template,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: {
          data: self.data ? self.data : "",
          callbackFunctions: self.callbackFunctions ? self.callbackFunctions : ""
        },
        fullscreen: false
      })
    }

    function DialogController(
      $scope,
      $mdDialog,
      data,
      callbackFunctions
    ) {
      $scope.data = data || {};
      $scope.editing = !!data && Object.keys(data).length > 0;
      $scope.cbFunctions = callbackFunctions;
      $scope.cancel = cancel;
      $scope.hide = hide;

      function hide() {
        $mdDialog.hide();
      }

      function cancel() {
        $mdDialog.cancel();
      }
    }

  }
}());