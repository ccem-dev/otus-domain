(function () {
    'use strict';

    angular
        .module('otusDomain.project')
        .service('otusDomain.project.activity.SurveyGroupConfigurationService', Service);

    Service.$inject = [
        'SurveyGroupRestService',
        'otusjs.survey.GroupManagerFactory'
    ];

    function Service(SurveyRestService, GroupManagerFactory) {
        var groupManagerFactory
        var self = this;

        /* Public methods */
        self.getListOfSurveyGroups = getListOfSurveyGroups;
        self.addNewGroup = addNewGroup;
        self.update = update;
        self.deleteGroup = deleteGroup;

        function getListOfSurveyGroups() {
            return SurveyRestService.getListOfSurveyGroups()
                .then(function (response) {
                    groupManagerFactory = GroupManagerFactory.create(response);
                    return groupManagerFactory;
                }).catch(function (e) {
                    return $q.reject(e);
                });
        }

        function addNewGroup(group) {
            var newGroup = groupManagerFactory.createGroup(group, []);
            return SurveyRestService.addNewGroup(newGroup)
                .then(function (response) {
                    console.log(response);
                }).catch(function (e) {
                    return $q.reject(e);
                });
        }

        function update(group) {

        }

        function deleteGroup(group) {

        }
    }
}());