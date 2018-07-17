(function() {
    'use strict';

    angular
        .module('otusDomain.project.fieldCenter')
        .controller('CreateFieldCenterController', CreateFieldCenterController);

    CreateFieldCenterController.$inject = ['$scope','$mdDialog', 'ProjectFieldCenterService', '$mdToast'];

    function CreateFieldCenterController($scope, $mdDialog, ProjectFieldCenterService, $mdToast) {
        var SUCCESS_MESSAGE = 'Centro Adicionado com Sucesso';
        var ERROR_MESSAGE = 'Invalido';
        var self = this;

        self.close = close;
        self.create = create;
        self.resetValidation = resetValidation;
        self.resetValidationCode = resetValidationCode;

        function close() {
            $mdDialog.cancel();
        }

        function create(fieldCenter) {
            ProjectFieldCenterService.create(fieldCenter, function(response) {

                if (!response.data.isValid) {
                    showErrorMessage(fieldCenter, response);
                    response.data.value.forEach(function (error) {
                      switch (error){
                        case "acronym":
                          $scope.createForm.acronym.$setValidity('ACRONYM_EXIST', false);
                          break;
                        case "code":
                          $scope.createForm.code.$setValidity('CODE_EXIST', false);
                          break;
                      }
                    })
                } else {
                showSuccessMessage();
                // close();
                }
            });
        }

        function showErrorMessage() {
          $mdToast.show(
            $mdToast.simple().textContent(ERROR_MESSAGE)
          );
        }

        function resetValidation(){
            $scope.createForm.acronym.$setValidity('ACRONYM_EXIST', true);
        }

        function resetValidationCode(){
          $scope.createForm.code.$setValidity('CODE_EXIST', true);
        }

        function showSuccessMessage() {
            $mdToast.show(
                $mdToast.simple().textContent(SUCCESS_MESSAGE)
            );
        }

    }

}());
