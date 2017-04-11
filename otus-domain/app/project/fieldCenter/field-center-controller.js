(function() {
    'use strict';

    angular
        .module('otusDomain.project.fieldCenter')
        .controller('FieldCenterController', FieldCenterController);

    FieldCenterController.$inject = ['ProjectFieldCenterService', '$mdDialog', '$mdToast'];

    function FieldCenterController(ProjectFieldCenterService, $mdDialog, $mdToast) {
        var SUCCESS_MESSAGE = 'Centro atualizado';
        var self = this;

        self.getAllCenters = getAllCenters;
        self.edit = edit;
        self.create = create;
        self.update = update;

        function getAllCenters() {
            return ProjectFieldCenterService.getCenters();
        }

        function edit(fieldCenter) {
            fieldCenter.editMode = !fieldCenter.editMode;
        }

        function update(fieldCenter) {
            ProjectFieldCenterService.update(fieldCenter, function(response) {
                if (!response.hasErrors) {
                    $mdToast.show(
                        $mdToast.simple().textContent(SUCCESS_MESSAGE)
                    );
                }
            });
        }

        function create() {
            $mdDialog.show({
                templateUrl: 'app/project/fieldCenter/dialog/create-field-center-template.html',
                clickOutsideToClose: true,
                controller: 'CreateFieldCenterController',
                controllerAs: 'createFieldCenter'
            });
        }
    }

}());
