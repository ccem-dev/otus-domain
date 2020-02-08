(function () {
    'use strict';

    angular
        .module('otusDomain.dashboard')
        .component('followUpConfiguration', {
            controller: 'followUpController as $ctrl',
            templateUrl: 'app/project/configuration/follow-up/follow-up-configuration-template.html'
        })
        .controller('followUpController', Controller);

    Controller.$inject = [
        '$q',
        '$mdToast',
        '$compile',
        '$scope',
        '$mdDialog',
        'otusDomain.LoadingScreenService',
        'otusDomain.dashboard.FollowUpConfigurationService',
        'otusjs.model.outcome.FollowUpFactory'
    ];

    function Controller($q, $mdToast, $compile, $scope, $mdDialog, LoadingScreenService, FollowUpConfigurationService, FollowUpFactory) {
        var self = this;


        self.followUps = [];
        const SAVE_FOLLOW = 'SAVE_FOLLOW';
        const EDIT_FOLLOW = 'EDIT_FOLLOW';
        const ADD_FOLLOW = 'ADD_FOLLOW';
        const DEACTIVATE_FOLLOW = 'DEACTIVATE_FOLLOW';
        const DEACTIVATE_EVENT = 'DEACTIVATE_EVENT';
        const SAVE_EVENT = 'SAVE_EVENT';

        self.option = ADD_FOLLOW;
        self.eventActive = null;
        self.isEditFollowUp = false;
        self.selectedFollowUp = null;
        self.isCreating = true;
        self.followUpActive = null;
        self.option = ADD_FOLLOW;
        self.indexEvent = null;
        self.isFirst = isFirst;


        self.typeEvent = null;
        self.action = action;
        self.editFollowUp = editFollowUp;
        self.removeFollowUp = removeFollowUp;
        self.addEvent = addEvent;
        self.cancel = cancel;
        self.saveEvent = saveEvent;
        self.removeEvent = removeEvent;
        self.cancelEvent = cancelEvent;
        self.addFollowUp = addFollowUp;


        var elem;

        /* Lifecycle hooks */
        self.$onInit = onInit;
        self.events = [
            {
                description: "Atividade Auto Preenchida", objectType: "ActivityAutoFillEvent",
                template: '<activity-auto-fill-event flex="100" save="$ctrl.saveEvent" cancel="$ctrl.cancelEvent"></activity-auto-fill-event>'
            }
        ];


        function onInit() {
            _reset();
            FollowUpConfigurationService.loadConfiguration().then(function (response) {
                self.followUps = response['data'] ? FollowUpFactory.fromArray(response['data']) : [];
            });
        }

        function removeEvent(index) {
            _confirm("Remover Evento", "Deseja remover o evento?").then(function () {
                self.option = DEACTIVATE_EVENT;
                self.indexEvent = index;
                self.action();
            });
        }

        function saveEvent(type, data) {
            _confirm("Salvar Evento", "Deseja salvar as alterações?").then(function () {
                self.eventActive = self.followUpActive.createEvent(type, data);
                self.option = SAVE_EVENT;
                self.action();
            })
        }

        function cancelEvent() {
            elem.html('');
        }

        function addEvent() {
            elem = angular.element(document.getElementById("events"));
            elem.html('');
            let component = $compile(self.typeEvent)($scope);
            elem.append(component);
            self.typeEvent = null;
        }


        function isFirst(){
            return self.followUps.length < 1 || self.selectedFollowUp < 1;
        }


        function addFollowUp(index) {
            self.isEditFollowUp = true;
            self.option = SAVE_FOLLOW;
            self.followUpActive = FollowUpFactory.create();
            self.selectedFollowUp = index
        }

        function action() {
            switch (self.option) {
                case "SAVE_FOLLOW":
                    self.followUpActive.windowBetween = isFirst() ? 0 : self.followUpActive.windowBetween;
                    FollowUpConfigurationService.addFollowUp(self.followUpActive.toJSON()).then(function (response) {
                        if (response.data.id) {
                            self.followUpActive._id = response.data.id;
                            self.followUps.push(angular.copy(self.followUpActive));
                            _reset();
                            _message('Seguimento criado com sucesso.');
                        }
                    }).catch(function () {
                        _message('Não foi possível salvar o seguimento! Tente novamente.');
                    });
                    break;
                case "EDIT_FOLLOW":
                    FollowUpConfigurationService.updateFollowUp(self.followUpActive.toJSON()).then(function (response) {
                        if (response) {
                            _reset();
                            _message('Seguimento alterado com sucesso.');
                        }
                    }).catch(function () {
                        _message('Não foi possível salvar as alterações! Tente novamente.');
                    });
                    break;
                case "ADD_FOLLOW":
                    self.addFollowUp();
                    break;
                case "DEACTIVATE_FOLLOW":
                    FollowUpConfigurationService.deactivateFollowUp(self.followUps[self.selectedFollowUp].toJSON()._id).then(function (response) {
                        if (response.data) {
                            _message('Seguimento removido com sucesso.');
                            self.followUps.splice(self.selectedFollowUp , 1);
                            _reset();
                        } else {
                            _message('Não foi possível salvar as alterações! Tente novamente.');
                        }
                    });
                    break;
                case "DEACTIVATE_EVENT":
                    self.editFollowUp(self.selectedFollowUp);
                    FollowUpConfigurationService.deactivateEvent(self.followUpActive.events[self.indexEvent]._id).then(function (response) {
                        if (response.data) {
                            _message('Evento removido com sucesso.');
                            self.followUpActive.events.splice(self.indexEvent, 1);
                        } else {
                            _message('Não foi possível salvar as alterações! Tente novamente.');
                        }
                    });
                    break;
                case "SAVE_EVENT":
                    self.editFollowUp(self.selectedFollowUp);
                    FollowUpConfigurationService.addEvent(self.followUps[self.selectedFollowUp].toJSON()._id,self.eventActive).then(function (response) {
                        if(response.data.id) {
                            _message('Evento salvo com sucesso.');
                            elem.html('');
                            self.eventActive._id = response.data.id;
                            self.followUpActive.events.push(angular.copy(self.eventActive));
                        } else {
                            _message('Não foi possível salvar as alterações! Tente novamente.');
                        }
                    });
                    break;
            }

        }

        function editFollowUp(index) {
            self.option = EDIT_FOLLOW;
            self.isCreating = false;
            self.followUpActive = self.followUps[index];
            self.isEditFollowUp = true;
            self.selectedFollowUp = index;
        }

        function removeFollowUp(index) {
            _confirm("Remover configurações", "Deseja realmente excluir este seguimento?").then(function () {
                self.option = DEACTIVATE_FOLLOW;
                self.selectedFollowUp = index;
                self.action();
            });
        }

        function _reset() {
            self.eventActive = null;
            self.isEditFollowUp = false;
            self.selectedFollowUp = null;
            self.isCreating = true;
            self.followUpActive = null;
            self.option = ADD_FOLLOW;
            self.indexEvent = null;
        }

        function cancel() {
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
