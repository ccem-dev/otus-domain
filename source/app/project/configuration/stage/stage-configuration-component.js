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
                        LoadingScreenService, StageValues, StageConfigurationService) {
        var self = this;

        self.stages = [];
        self.stage = {}
        self.isEditStage;

        self.$onInit = onInit;
        self.addStage = addStage;
        self.editStage = editStage;
        self.saveStage = saveStage;
        self.cancel = cancel;

        function onInit() {
            self.isEditStage = false;
            self.stageValues = StageValues;
            self.stages = StageConfigurationService.loadStages();
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

            if(self.stage._id){
                confirm(self.stage.getId());
            }else{
                confirm("não é instance");
            }
        }

        function reset(){
            self.stage = {};
            self.stageForm.$setPristine;
        }

        function cancel(){
            reset();
            onInit();
        }

    }

}());
