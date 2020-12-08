(function() {
    'use strict';

    angular
        .module('otusDomain')
        .service('AuthService', AuthService);

    AuthService.$inject = [
        '$window',
        '$cookies'
    ];

    function AuthService($window, $cookies) {
        var self = this;

        self.minValidityToken = 2000;
        self.keycloak = new Keycloak( "./volumes/keycloak.json");

        self.getKeycloak = getKeycloak;
        self.keycloakInit = keycloakInit;
        self.verifyAuthentication = verifyAuthentication;

        function keycloakInit() {
            const productionAddress = $cookies.get('Production-Base-Path')
            const uri = $window.location.origin + `${productionAddress ?  productionAddress : ''}/#!/home`
            return self.keycloak.init({
                onLoad: 'login-required',
                flow: 'implicit',
                redirectUri: uri
            })
                .success((res) => self.keycloak)
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
