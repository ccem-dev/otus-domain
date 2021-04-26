(function () {
    'use strict';

    angular
        .module('otusDomain.dashboard')
        .component('groupConfiguration', {
            controller: 'groupConfigurationCtrl as $ctrl',
            templateUrl: 'app/project/configuration/laboratory/group-configuration/group-configuration-template.html'
        })
        .controller('groupConfigurationCtrl', Controller);

    Controller.$inject = [
        '$q',
        '$mdToast',
        '$mdDialog',
        'otusDomain.LoadingScreenService',
        'otusDomain.rest.configuration.ProjectConfigurationService',
        'DashboardStateService'
    ];

    function Controller($q, $mdToast, $mdDialog, LoadingScreenService, ProjectConfigurationService, DashboardStateService) {
        var self = this;

        self.createGroup = createGroup;
        self.updateGroup = updateGroup;
        self.deleteGroup = deleteGroup;

        self.createTube = createTube;
        self.updateTube = updateTube;
        self.deleteTube = deleteTube;

        self.createMoment = createMoment;
        self.updateMoment = updateMoment;
        self.deleteMoment = deleteMoment;



        self.tubeHeaders = [
            { name: 'color', label: "Cor" },
            { name: 'type', label: "Tipo" },
            { name: 'label', label: "Label" }
        ]

        self.momentsHeaders = [
            { name: 'name', label: 'Nome' },
            { name: 'label', label: 'Label' }
        ]


        self.groupsHeaders = [
            { name: "name", label: "Nome do grupo" },
            { name: "type", label: "Tipo" }
        ]

        self.groupsRecords = [];
        self.tubeRecords = [];
        self.momentsRecords = [];

        function createTube(data) {
            self.tubeRecords.push(data)
        }

        function updateTube(n, data) {
            self.tubeRecords[n] = data
        }

        function deleteTube(data) {
            self.tubeRecords.splice(self.tubeRecords.indexOf(data), 1)
        }

        function createMoment(data) {
            self.momentsRecords.push(data);
        }

        function updateMoment(n, data) {
            self.momentsRecords[n] = data
        }

        function deleteMoment(data) {
            self.momentsRecords.splice(self.momentsRecords.indexOf(data), 1)
        }

        function createGroup(data) {
            self.groupsRecords.push(data);
        }

        function updateGroup(n, data) {
            self.groupsRecords[n] = data;
        }

        function deleteGroup(data) {
            self.groupsRecords.splice(self.groupsRecords.indexOf(data), 1);
        }

        // var ERROR_MESSAGE = 'Ocorreu algum problema, tente novamente mais tarde';
        var timeShowMsg = 5000;

        /* Lifecycle hooks */
        self.$onInit = onInit;

        /* Public Interface*/


        function onInit() {

        }
    }
}());