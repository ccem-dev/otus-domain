(function() {
    'use strict';

    angular
        .module('otusDomain.user')
        .service('UserService', service);

    service.$inject = ['RestResourceService', 'OtusRestResourceService', '$q', 'UserContext', 'AuthService'];

    function service(domainResource, otusResource, $q, UserContext, AuthService) {
        var self = this;
        self.getLoggedUser = getLoggedUser;
        self.logout = logout;

        function logout() {
            const keycloak = AuthService.getKeycloak()
            if(keycloak.authenticated) {
                keycloak.logout()
            }
        }

        function getLoggedUser() {
            const keycloak = AuthService.getKeycloak()
            return new Promise((resolve, reject) => {
                keycloak.loadUserProfile()
                    .success(user => resolve(user))
                    .error(err => reject(err))
            })
        }
    }

}());
