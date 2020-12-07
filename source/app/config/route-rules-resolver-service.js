(function() {
    'use strict';

    angular
        .module('otusDomain')
        .service('RouteRulesResolver', RouteRulesResolver);

    RouteRulesResolver.$inject = ['$state', '$rootScope', '$q', 'ProjectContext', 'DashboardStateService', 'APP_STATE', 'RestResourceService', 'AuthService'];

    function RouteRulesResolver($state, $rootScope, $q, ProjectContext, DashboardStateService, APP_STATE, RestResourceService, AuthService) {
        var self = this;
        self.loggedUser = loggedUser;
        self.selectedProject = selectedProject;
        self.initialConfiguration = initialConfiguration;
        self.onlyOneConfiguration = onlyOneConfiguration;

        function loggedUser() {
            AuthService.verifyAuthentication()
        };

        function selectedProject() {
            var deferred = $q.defer();

            if (ProjectContext.hasProject()) {
                deferred.resolve();
            } else {
                deferred.reject({
                    redirectTo: APP_STATE.HOME
                });
            }

            return deferred.promise;
        };

        function initialConfiguration() {
            var deferred = $q.defer();
            var installerResource = RestResourceService.getInstallerResource();
            installerResource.ready(function(response) {
                if (response.data) {
                    deferred.resolve();
                } else {
                    deferred.reject({
                        redirectTo: APP_STATE.HOME
                    });
                }
            });

            return deferred.promise;
        };

        function onlyOneConfiguration() {
            var deferred = $q.defer();

            var installerResource = RestResourceService.getInstallerResource();
            installerResource.ready(function(response) {
                if (response.data) {
                    deferred.reject({
                        redirectTo: APP_STATE.HOME
                    });
                } else {
                    deferred.resolve();
                }
            });

            return deferred.promise;
        };

        $rootScope.$on('$stateChangeError', function(evt, to, toParams, from, fromParams, error) {
            evt.preventDefault();
            if (error.redirectTo) {
                $state.go(error.redirectTo);
            } else {
                $state.go('error', {
                    status: error.status
                });
            }
        });
    }

}());
