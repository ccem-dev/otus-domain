(function () {
    'use strict';

    angular
        .module('otusDomain.dashboard')
        .component('stageConfiguration', {
            controller: 'stageController as $ctrl',
            templateUrl: 'app/project/configuration/stage/stage-configuration-template.html'
        })
        .controller('stageController', Controller);

    Controller.$inject = [
        '$q',
        '$mdToast',
        '$compile',
        '$scope',
        '$mdDialog',
        'otusDomain.LoadingScreenService',
        'otusDomain.dashboard.StageValues',
        'otusDomain.dashboard.StageConfigurationService'
    ];

    function Controller($q, $mdToast, $compile, $scope, $mdDialog,
                        LoadingScreenService, stageValues, stageConfigurationService) {
        var self = this;

        self.stages = [];
        self.stage = {}
        self.isEditStage = false;

        self.$onInit = onInit;
        self.loadStages = loadStages;
        self.editStage = editStage;
        self.addStage = addStage;
        self.saveStage = saveStage;
        self.removeStage = removeStage;
        self.reload = reload;

        function onInit() {
            self.isEditStage = false;
            self.stageValues = stageValues;
            loadStages();
        }

        function loadStages() {
            self.stages = [];
            LoadingScreenService.start();
            stageConfigurationService.loadStages()
                .then(stages => self.stages = stages)
                .then(() => LoadingScreenService.finish());
        }

        function addStage() {
            self.isEditStage = true;
        }

        function editStage(stageData) {
            self.isEditStage = true;
            self.stage = angular.copy(stageData);
        }

        function saveStage() {
            let stage = angular.copy(stageConfigurationService.parseStage(self.stage));
            if (self.stageForm.$invalid) {
                return;
            }
            stage.getId() ? updateStage(stage) : createStage(stage);
        }

        function updateStage(stage) {
            $mdDialog.show(confirmation(stageValues.confirmation.updateStage, self.stage)).then(() => {
                stageConfigurationService.updateStage(stage)
                    .then(() => reload())
                    .then(() => $mdToast.show($mdToast.simple()
                        .textContent(stageValues.toast.updateSuccess).hideDelay(5000)))
            });
        }

        function createStage() {
            stageConfigurationService.createStage(self.stage)
                .then(() => reload())
                .then(() => $mdToast.show($mdToast.simple()
                    .textContent(stageValues.toast.successMessage).hideDelay(5000)))
        }

        function removeStage(stage) {
            $mdDialog.show(confirmation(stageValues.confirmation.deleteStage, stage)).then(() => {
                stageConfigurationService.removeStage(stage.getId())
                    .then(response => console.info(response.data))
                    .then(() => reload())
                    .then(() => $mdToast.show($mdToast.simple().textContent(stageValues.toast.deleteSucess).hideDelay(5000)))
            })
        }

        function reset() {
            self.stage = {};
            // self.stageForm.name.$valid;
            // self.stageForm.name.$setPristine();
            // self.stageForm.name.$setUntouched();
            // self.stageForm.name.$setValidity();

            self.stageForm.$setPristine();
            self.stageForm.$setUntouched();
            // self.stageForm.$rollbackViewValue();
        }

        function reload() {
            reset();
            self.isEditStage = false;
            loadStages();
        }

        function confirmation(contextValues, item) {
            return $mdDialog.confirm()
                .title(contextValues.title + item.getName())
                .textContent(contextValues.textContent)
                .ariaLabel(contextValues.ariaLabel)
                .ok(stageValues.confirmation.buttons.confirm)
                .cancel(stageValues.confirmation.buttons.cancel);
        }
    }

}());
