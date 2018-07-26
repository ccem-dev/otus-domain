(function () {
  'use strict';

  angular
    .module('otusDomain.project.fieldCenter')
    .component('centerCard', {
      controller: Controller,
      templateUrl: 'app/project/fieldCenter/center-card/center-card-template.html',
      bindings: {
        showTab: '='
      }
    });

  Controller.$inject = ['DashboardStateService', '$scope', 'ProjectFieldCenterService', '$mdToast'];

  function Controller(DashboardStateService, $scope, ProjectFieldCenterService, $mdToast) {
    var SUCCESS_MESSAGE = 'Centro Adicionado com Sucesso';
    var ERROR_MESSAGE = 'Dados Invalidos';
    var self = this;
    $scope.master = {};

    /* Public methods */
    self.create = create;
    self.reset = reset;
    self.resetValidation = resetValidation;
    self.resetValidationCode = resetValidationCode;

    function create(fieldCenter) {
      ProjectFieldCenterService.create(fieldCenter, function (response) {
        if (response.CONTENT && response.CONTENT.valid === false) {
          showErrorMessage(fieldCenter, response);
          response.CONTENT.value.forEach(function (error) {
            switch (error) {
              case 'acronym':
                $scope.createForm.acronym.$setValidity('ACRONYM_EXIST', false);
                break;
              case 'code':
                $scope.createForm.code.$setValidity('CODE_EXIST', false);
                break;
            }
          })
        } else {
          showSuccessMessage();
          ProjectFieldCenterService.loadCenters();
          self.showTab = false;
        }
      });
      reset();
    }

    function showErrorMessage() {
      $mdToast.show(
        $mdToast.simple().textContent(ERROR_MESSAGE)
      );
    }

    function resetValidation(){
      $scope.createForm.acronym.$setValidity('ACRONYM_EXIST', true);
    }

    function resetValidationCode() {
      $scope.createForm.code.$setValidity('CODE_EXIST', true);
    }

    function showSuccessMessage() {
      $mdToast.show(
        $mdToast.simple().textContent(SUCCESS_MESSAGE)
      );
    }

    function reset() {
      $scope.fieldCenter = angular.copy($scope.master);
    }
  }
}());
