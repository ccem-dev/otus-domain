(function () {
    'use strict';

    angular
        .module('otusDomain.dashboard')
        .component('activityAutoFillEvent', {
            controller: 'autoFillCtrl as $ctrl',
            templateUrl: 'app/project/configuration/follow-up/events/activity-auto-fill-template.html',
            bindings: {
                save: '&',
                cancel: '&'
            }
        })
        .controller('autoFillCtrl', Controller);

    Controller.$inject = [
        'otusDomain.LoadingScreenService',
        'otusjs.model.outcome.ActivityAutoFillEventFactory',
        'otusDomain.rest.configuration.ProjectConfigurationService'
    ];

    function Controller(LoadingScreenService, ActivityAutoFillEventFactory, ProjectConfigurationService) {
        var self = this;

        self.preEvent = {};
        self.typeEvent = null;
        self.selectedSurvey = null;

        self.$onInit = onInit;
        self.$onDestroy = onDestroy;
        self.select = select;


        function onInit() {
            self.data = ActivityAutoFillEventFactory.create();
            _getTemplatesList();
        }


        function onDestroy() {
            delete self.data;
        }

        function _getTemplatesList() {
            LoadingScreenService.start();
            ProjectConfigurationService.getSurveysManagerConfiguration()
                .then(function (data) {
                    self.surveys = data;
                    if (self.surveys.length === 0) {
                        self.noListInfo = 'Nenhum formulário adicionado';
                    } else {
                        self.noListInfo = '';
                    }
                    LoadingScreenService.finish();
                }).catch(function () {
                self.surveys = [];
                self.noListInfo = 'Erro de comunicação com servidor';
                LoadingScreenService.finish();
            });
        }

        function select() {
            self.data.acronym = self.selectedSurvey.acronym;
            self.data.name = self.selectedSurvey.name;
        }


    }
}());
