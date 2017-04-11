(function() {
    'use strict';

    angular
        .module('otusDomain.project.fieldCenter')
        .controller('CreateFieldCenterController', CreateFieldCenterController);

    CreateFieldCenterController.$inject = ['$scope','$mdDialog', 'ProjectFieldCenterService', '$mdToast'];

    function CreateFieldCenterController($scope, $mdDialog, ProjectFieldCenterService, $mdToast) {
        var SUCCESS_MESSAGE = 'Centro Adicionado com Sucesso';
        var self = this;

        self.close = close;
        self.create = create;
        self.resetValidation = resetValidation;

        function close() {
            $mdDialog.cancel();
        }

        function create(fieldCenter) {
            ProjectFieldCenterService.create(fieldCenter, function(response) {
                if (response.hasErrors) {
                    showErrorMessage(fieldCenter, response);
                } else {
                    showSuccessMessage();
                    close();
                }
            });
        }

        function showErrorMessage(fieldCenter, response) {
            $scope.createForm.acronym.$setValidity(response.data.errorType, false);
        }

        function resetValidation(){
            $scope.createForm.acronym.$setValidity('ALREADY_EXIST', true);
        }

        function showSuccessMessage() {
            $mdToast.show(
                $mdToast.simple().textContent(SUCCESS_MESSAGE)
            );
        }

    }

}());
