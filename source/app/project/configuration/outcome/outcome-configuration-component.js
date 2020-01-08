(function () {
    'use strict';

    angular
        .module('otusDomain.dashboard')
        .component('outcomeConfiguration', {
            controller: 'outcomeController as $ctrl',
            templateUrl: 'app/project/configuration/outcome/outcome-configuration-template.html'
        })
        .controller('outcomeController', Controller);

    Controller.$inject = [
        '$q',
        '$mdToast',
        '$compile',
        '$scope',
        '$mdDialog',
        'otusDomain.LoadingScreenService',
        'otusDomain.dashboard.outcome.OutcomeConfigurationService'
    ];

    function Controller($q, $mdToast, $compile, $scope, $mdDialog, LoadingScreenService, OutcomeConfigurationService) {
        var self = this;


        // self.followUps = [];
        self.isNewFollowUp = true;
        self.selectedFollowUp = null;
        self.typeEvent = null;
        self.init = init;
        self.saveOutcome = saveOutcome;
        self.action = action;
        self.editFollowUp = editFollowUp;
        self.removeFollowUp = removeFollowUp;
        self.createFollowUp = createFollowUp;
        self.addEvent = addEvent;
        self.select = select;
        self.cancel = cancel;
        self.saveConfiguration = saveConfiguration;
        self.saveEvent = saveEvent;
        self.cancelEvent = cancelEvent;

        var elem;

        /* Lifecycle hooks */
        self.$onInit = onInit;
        self.isCreating = false;
        self.isEditFollowUp = false;
        self.outcome = null;
        self.events = [
            {
                label: "Atividade Auto Preenchida", objectType: "ActivityAutoFillEvent",
                template: '<activity-auto-fill-event flex="100" save="$ctrl.saveEvent" cancel="$ctrl.cancelEvent"></activity-auto-fill-event>'
            }
        ];


        function onInit() {
            _reset();
            OutcomeConfigurationService.loadConfiguration().then(function (response) {
                self.outcome = response;
            });
        }

        function init() {
            self.preOutcome = OutcomeConfigurationService.initialize();
        }

        function saveConfiguration() {
            _confirm("Salvar configurações", "Deseja salvar as alterações?").then(function () {
                self.isEditFollowUp = false;
                _reset();
                _message('Configurações salvas com sucesso.');
                OutcomeConfigurationService.saveConfiguration(self.outcome).then(function (response) {
                    if (response) _message('Configurações salvas com sucesso.')
                }).catch(function (error) {
                    _message('não foi possível salvar as alterações!')
                });
            });
        }


        function saveEvent(type, data) {
            _confirm("Salvar configurações", "Deseja salvar as alterações?").then(function () {
                self.outcome.followUps[self.selectedFollowUp].addEvent(type, data);
                elem.html('');
            })
        }

        function cancelEvent() {
            elem.html('');
        }

        function saveOutcome() {
            self.outcome = OutcomeConfigurationService.load(angular.copy(self.preOutcome));
            OutcomeConfigurationService.saveConfiguration(self.outcome).then(function () {
                _message('Configurações salvas com sucesso.');
                delete self.preOutcome;
            });
        }

        function action() {
            if (self.preOutcome) delete self.preOutcome;
            if (self.isEditFollowUp) {
                OutcomeConfigurationService.updateConfiguration(self.outcome).then(function () {
                    _message('Configurações salvas com sucesso.');
                    self.isNewFollowUp = false;
                });
            } else if (self.outcome) {
                self.outcome.addFollowUp();
                self.selectedFollowUp = self.outcome.followUps.length - 1;
                self.isEditFollowUp = true;
            } else if (!self.preOutcome) {
                self.init();
            }
        }

        function editFollowUp(index) {
            self.isNewFollowUp = false;
            self.isEditFollowUp = true;
            self.selectedFollowUp = index;
        }

        function removeFollowUp(index) {
            _confirm("Remover configurações", "Deseja realmente excluir este seguimento?").then(function () {
                self.outcome.removeFollowUp(index);
            });
        }


        function createFollowUp() {
            _reset();
            _message('Seguimento criado com sucesso.');
        }

        function addEvent() {
            elem = angular.element(document.getElementById("events"));
            elem.html('');
            let component = $compile(self.typeEvent)($scope);
            elem.append(component);
            self.typeEvent = null;
        }


        function _reset() {
            self.isEditFollowUp = false;
            self.selectedFollowUp = null;
            self.isNewFollowUp = true;
        }

        function cancel() {
            if (self.isNewFollowUp) {
                let _index = self.outcome.followUps.length - 1;
                self.outcome.removeFollowUp(_index);
            }
            _reset();
        }

        function _message(msg) {
            $mdToast.show(
                $mdToast.simple()
                    .position('bottom right')
                    .textContent(msg)
                    .hideDelay(3000)
            );
        }

        function _confirm(title, message) {
            return $mdDialog.show($mdDialog.confirm()
                .title(title)
                .textContent(message)
                .ariaLabel('Confirmação')
                .ok('Sim')
                .cancel('Não')).then(function () {
                return true;
            });
        }


    }
}());
