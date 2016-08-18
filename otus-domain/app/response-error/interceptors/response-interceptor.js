(function() {
    'use strict';

    angular
        .module('otusDomain')
        .factory('otusDomain.ResponseInterceptor', factory);

    factory.$inject = ['$injector'];

    function factory($injector) {
        var self = this;

        self.responseError = responseError;

        function responseError(response) {
            var dashboard = $injector.get('DashboardStateService');

            /**
             * TODO
             * Check if response has any error. You must differentiate when one
             * Otus project without access

            if (response.status === -1) {
                //dashboard.goToErrorOffline();
            }
            **/

            return response;
        }

        return self;
    }

}());
