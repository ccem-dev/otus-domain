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
                        loadingScreenService, stageValues, stageConfigurationService) {
        var self = this;

        self.stages = [];
        self.stage = {}
        self.isEditStage = false;

        self.$onInit = onInit;
        self.loadStages = loadStages;
        self.editStage = editStage;
        self.addStage = addStage;
        self.saveStage = saveStage;
        self.deleteStage = deleteStage;
        self.reload = reload;

        function onInit() {
            self.isEditStage = false;
            self.stageValues = stageValues;
            loadStages();

        }

        function loadStages(){
            stageConfigurationService.loadStages().then(stages => self.stages = stages);
        }

        function addStage(){
            self.isEditStage = true;
        }

        function editStage(stage){
            self.isEditStage = true;
            self.stage = stage;
        }

        function saveStage(){
            if(self.stageForm.$invalid){
                return;
            }

            self.stage._id ? updateStage(self.stage) : createStage(self.stage)

            // if(self.stage._id){
            //     console.log(self.stage)
            //     stageConfigurationService.updateStage(self.stage)
            //     //     .then(response => console.info(response.data))
            //     //     .then(() => reload());
            // }else{
            //     stageConfigurationService.addStage(self.stage)
            //         .then(response => console.info(response.data))
            //         .then(() => reload());
            // }
        }

        function updateStage(stage){
            stageConfigurationService.updateStage(stage)
                 .then(response => console.info(response.data))
                 .then(() => reload());
        }

        function createStage(stage){
            stageConfigurationService.createStage(self.stage)
                .then(response => console.info(response.data))
                .then(() => reload());
        }





        function deleteStage(stage){
            stageConfigurationService.deleteStage(stage.getId()).then(()=>{});
        }

        function reset(){
            self.stage = {};
            self.stageForm.$setPristine();
            self.stageForm.$setUntouched();
            self.stageForm.$rollbackViewValue();
        }

        function reload(){
            reset();
            self.isEditStage = false;
            loadStages();
        }
    }

}());
