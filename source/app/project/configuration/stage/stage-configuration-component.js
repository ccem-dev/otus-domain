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
    ];

    function Controller($q, $mdToast, $compile, $scope, $mdDialog, LoadingScreenService) {
        var self = this;

        self.isEditStage = false;
        self.addStage = addStage;


        function addStage(){
            confirm("addStage")
        }
    }

}());
