(function() {
    'use strict';

    angular
        .module('otusDomain')
        .controller('ResponseErrorOfflineController', controller);

    controller.$inject = ['DashboardStateService'];

    function controller(DashboardStateService) {
        var self = this;
        self.tryAgain = tryAgain;

        function tryAgain() {
            DashboardStateService.goToLogin();
        }
    }
}());
