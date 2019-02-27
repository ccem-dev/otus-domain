(function () {
    'use strict';

    angular
        .module('otusDomain.dashboard')
        .service('SurveyGroupConfigurationService', Service);

    Service.$inject = [
        'SurveyRestService',
        'otusjs.survey.GroupManagerFactory'
    ];

    function Service(SurveyRestService, GroupManagerFactory) {
        var self = this;
        self.getListOfSurveyGroups = getListOfSurveyGroups;
        self.addNewGroup = addNewGroup;
        self.update = update;
        self.deleteGroup = deleteGroup;

        onInit();

        function onInit() {

        }

        function getListOfSurveyGroups() {

        }

        function addNewGroup(group) {
            // TODO: utilizar o modelo!
        }

        function update(group) {

        }

        function deleteGroup(group) {

        }
    }
}());