(function() {
    'use strict';

    angular
        .module('otusDomain')
        .service('AuthService', AuthService);

    AuthService.$inject = [
        '$window',
    ];

    function AuthService($window) {
        var self = this;

        self.minValidityToken = 2000;
        self.keycloak = new Keycloak( "./volumes/keycloak.json");

        self.getKeycloak = getKeycloak;
        self.keycloakInit = keycloakInit;
        self.verifyAuthentication = verifyAuthentication;

        function keycloakInit() {
            const uri = $window.location.origin + '/#!/home'
            return self.keycloak.init({
                onLoad: 'login-required',
                flow: 'implicit',
                redirectUri: uri
            }).success((res) => self.keycloak)
            .error(error => error)
        }

        function getKeycloak() {
            return self.keycloak;
        }

        function verifyAuthentication() {
            const auth = getKeycloak()
            if(auth.authenticated) {
                if(!auth.isTokenExpired(self.minValidityToken)) {
                    auth.logout()
                }
            }
        }
    }
}());
