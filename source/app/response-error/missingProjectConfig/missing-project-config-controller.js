(function() {
    'use strict';

    angular
        .module('otusDomain')
        .controller('ResponseErrorMissingProjectController', controller);

    controller.$inject = ['DashboardStateService'];

    function controller(DashboardStateService) {
        var self = this;
        self.tryAgain = tryAgain;

        function tryAgain() {
            DashboardStateService.goToHome();
        }
    }
}());
