(function() {
    'use strict';

    angular
        .module('otusDomain')
        .service('RouteRulesResolver', RouteRulesResolver);

    RouteRulesResolver.$inject = ['$q', 'ProjectContext', 'DashboardStateService', 'APP_STATE', 'RestResourceService'];

    function RouteRulesResolver($q, ProjectContext, DashboardStateService, APP_STATE, RestResourceService) {
        var self = this;

        self.loggedUser = function loggedUser() {
            var deferred = $q.defer();

            if (!RestResourceService.isLogged()) {
                deferred.reject({
                    redirectTo: APP_STATE.LOGIN
                });
            } else {
                deferred.resolve();
            }

            return deferred.promise;
        };

        self.alreadyLogged = function alreadyLogged() {
            var deferred = $q.defer();

            if (RestResourceService.isLogged()) {
                deferred.reject({
                    redirectTo: APP_STATE.HOME
                });
            } else {
                deferred.resolve();
            }

            return deferred.promise;
        };

        self.selectedProject = function selectedProject() {
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

        self.initialConfiguration = function initialConfiguration() {
            var deferred = $q.defer();

            var installerResource = RestResourceService.getInstallerResource();
            installerResource.ready(function(response) {
                if (response.data) {
                    deferred.resolve();
                } else {
                    deferred.reject({
                        redirectTo: APP_STATE.INSTALLER
                    });
                }
            });

            return deferred.promise;
        };
    }

}());
