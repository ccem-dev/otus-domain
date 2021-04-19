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
        self.panelOpen = self.open || true;
        self.togglePanel = togglePanel;

        function togglePanel() {
            self.panelOpen = !self.panelOpen;
        }
    }
}());
