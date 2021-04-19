(function () {
    'use strict';

    angular
        .module('otusDomain.dashboard')
        .component('responsiveTable', {
            controller: 'responsiveTableCtrl as $ctrl',
            templateUrl: 'app/project/components/responsive-table/responsive-table-template.html',
            bindings: {
                headers: '<',
                records: '<',
                fillContainer: '<',
                colorHeader: "@",
                delete: "<",
                editButtonText: "<",
                dialogData: "=",
                updateAction: "<",
                dialogTemplate: "<"
            }
        })
        .controller('responsiveTableCtrl', Controller);

    Controller.$inject = [
        '$q',
        '$mdToast',
        '$mdDialog',
        'otusDomain.LoadingScreenService',
        'otusDomain.rest.configuration.ProjectConfigurationService'
    ];

    function Controller($q, $mdToast, $mdDialog, LoadingScreenService, ProjectConfigurationService) {
        var self = this;

        /* Lifecycle hooks */
        self.$onInit = onInit;

        /* Public Interface*/
        function onInit() {
            console.info(self.records)
        }
    }
}());
