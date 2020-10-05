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

    function Controller($q, $mdToast, $compile, $scope, $mdDialog, LoadingScreenService, StageValues, StageConfigurationService) {
        var self = this;

        self.stages = [];
        self.isEditStage = false;

        self.$onInit = onInit;
        self.addStage = addStage;

        function onInit() {
            self.stageValues = StageValues;
            self.stages = StageConfigurationService.loadStages();
        }

        function addStage(){
            confirm("addStage")
        }
    }

}());
