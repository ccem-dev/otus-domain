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
        '$mdToast',
        '$mdDialog',
        'otusDomain.LoadingScreenService',
        'otusDomain.dashboard.StageValues',
        'otusDomain.dashboard.StageConfigurationService'
    ];

    function Controller($mdToast, $mdDialog, LoadingScreenService, stageValues, stageConfigurationService) {
        const self = this;
        const SUCCESS_MESSAGE = 'successMessage';
        const FAILURE_MESSAGE = 'failureMessage';
        const DELETE_SUCCESS_MESSAGE = 'deleteSuccessMessage';
        const UPDATE_SUCCESS_MESSAGE = 'updateSuccessMessage';
        const CONFLICT_MESSAGE = 'conflictMessage';

        self.stages = [];
        self.stage = {}
        self.isEditStage = false;

        self.$onInit = onInit;
        self.loadStages = loadStages;
        self.addStage = addStage;
        self.editStage = editStage;
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
                .then(() => LoadingScreenService.finish())
                .catch(() => reportFailureToast());
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
                self.stageForm.$setDirty();
                return;
            }
            stage.getId() ? updateStage(stage) : createStage(stage);
        }

        function updateStage(stage) {
            $mdDialog.show(confirmation(stageValues.confirmation.updateStage, self.stage)).then(() => {
                stageConfigurationService.updateStage(stage)
                    .then(data => {
                        data.STATUS === 'CONFLICT' ?
                            callToast(CONFLICT_MESSAGE, true) : callToast(UPDATE_SUCCESS_MESSAGE);
                    })
                    .then(() => reload())
                    .catch(() => reportFailureToast());
            }).catch(() => reload())
        }

        function createStage() {
            stageConfigurationService.createStage(self.stage)
                .then(data => {
                    data.STATUS === 'CONFLICT' ?
                        callToast(CONFLICT_MESSAGE, true) : callToast(SUCCESS_MESSAGE);
                })
                .then(() => reload())
                .catch(() => reportFailureToast());
        }

        function removeStage(stage) {
            $mdDialog.show(confirmation(stageValues.confirmation.deleteStage, stage)).then(() => {
                stageConfigurationService.removeStage(stage.getId())
                    .then(() => reload())
                    .then(() => callToast(DELETE_SUCCESS_MESSAGE))
                    .catch(() => reportFailureToast())
            }).catch(() => reload());
        }

        function reset() {
            self.stageForm.$setUntouched();
            self.stageForm.$setPristine();
            self.stage = {};
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

        function reportFailureToast(){
            LoadingScreenService.finish();
            callToast(FAILURE_MESSAGE, true);
        }

        function callToast(msg, error) {
            let toastCss = error ? "md-toast-error" : "md-toast-done";
            return $mdToast.show($mdToast.simple()
                .toastClass(toastCss)
                .textContent(stageValues.toast[msg])
                .hideDelay(5000));
        }

    }

}());
