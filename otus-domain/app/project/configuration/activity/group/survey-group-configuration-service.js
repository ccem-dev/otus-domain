(function() {
    'use strict';

    angular
        .module('otusDomain.dashboard')
        .service('SurveyGroupConfigurationService', Service);

    Service.$inject = [
        'otusjs.survey.GroupManagerFactory'
    ];

    function Service(GroupManagerFactory) {
        var self = this;

        onInit();

        function onInit() {

        }
    }
}());