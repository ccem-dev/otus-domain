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
        'otusDomain.dashboard.stageValues'
    ];

    function Controller($q, $mdToast, $compile, $scope, $mdDialog, LoadingScreenService, stageValues) {
        var self = this;

        self.stages = [
            {name: "Onda 1"},
            {name: "Onda 2"},
        ];
        self.isEditStage = false;

        self.$onInit = onInit;
        self.addStage = addStage;

        function onInit() {
            self.stageValues = stageValues;
        }


        function addStage(){
            confirm("addStage")
        }
    }

}());
