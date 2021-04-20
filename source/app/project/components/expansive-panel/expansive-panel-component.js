(function () {
    'use strict';

    angular
        .module('otusDomain.dashboard')
        .component('expansivePanel', {
            transclude: true,
            controller: 'expansivePanelCtrl as $ctrl',
            templateUrl: 'app/project/components/expansive-panel/expansive-panel-template.html',
            bindings: {
                label: "@",
                open: "<",
                cancelLabel: "@",
                buttonText: "@",
                dialogData: "=",
                deleteData: "<",
                deleteAction: '<',
                createAction: "<",
                updateAction: "<",
                dialogTemplate: "<",
                tableHeaders: "<",
                tableRecords: "<"
            }
        })
        .controller('expansivePanelCtrl', Controller);

    function Controller() {
        var self = this;
        self.panelOpen = false;

        self.$onInit = onInit;

        self.togglePanel = togglePanel;

        function onInit() {
            if(!self.tableRecords || self.tableRecords.length === 0) {
                self.panelOpen = true;
            }
        }

        function togglePanel() {
            self.panelOpen = !self.panelOpen;
        }
    }
}());
