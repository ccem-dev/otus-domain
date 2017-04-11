(function() {
    'use strict';

    angular
        .module('otusDomain.user')
        .service('UserService', service);

    service.$inject = ['RestResourceService', 'OtusRestResourceService', '$q', 'UserContext'];

    function service(domainResource, otusResource, $q, UserContext) {
        var self = this;
        self.getLoggedUser = getLoggedUser;
        self.authenticate = authenticate;
        self.logout = logout;
        self.reloadLoggedUser = reloadLoggedUser;

        function authenticate(widget) {
            var deferred = $q.defer();
            var authenticatorResource = domainResource.getAuthenticatorResource();

            authenticatorResource.authenticate(widget, function(response) {
                if (response.data) {
                    _addLoggedUser(response.data);
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            });

            return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer();
            var authenticatorResource = domainResource.getAuthenticatorResource();

            authenticatorResource.invalidate(function() {
                _removeLoggedUser();
                deferred.resolve();
            }, function() {
                deferred.reject();
            });

            return deferred.promise;
        }

        function reloadLoggedUser() {
            UserContext.reloadCurrentUser();
        }

        function _addLoggedUser(user) {
            domainResource.setSecurityToken(user.token);
            UserContext.setCurrentUser(user);
        }

        function _removeLoggedUser() {
            UserContext.removeCurrentUser();
            domainResource.removeSecurityToken();
            otusResource.removeSecurityToken();
        }

        function getLoggedUser() {
            return UserContext.getCurrentUser();
        }
    }

}());
