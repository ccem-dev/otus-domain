(function() {
    'use strict';

    angular
        .module('otusDomain.dashboard')
        .service('DashboardStateService', DashboardStateService);

    DashboardStateService.$inject = [
        '$location',
        '$http',
        'APP_STATE',
        'RestResourceService'
    ];

    function DashboardStateService($location, $http, APP_STATE, RestResourceService) {
        var self = this;

        var HOSTNAME_REST = 'http://' + window.location.hostname;

        /* Public interface */
        self.goToLogin = goToLogin;
        self.goToHome = goToHome;
        self.goToInstaller = goToInstaller;
        self.goToUserRegister = goToUserRegister;
        self.goToUserActivation = goToUserActivation;
        self.logout = logout;

        init();

        function init() {
            self.currentState = 'Login';
        }

        function goToLogin() {
            self.currentState = 'Login';
            $location.url(APP_STATE.LOGIN);
        }

        function goToInstaller() {
            self.currentState = 'Instalador do Sistema';
            $location.url(APP_STATE.INSTALLER);
        }

        function goToUserRegister() {
            self.currentState = 'Cadastro de Usuário';
            $location.url(APP_STATE.USER_REGISTER);
        }

        function goToHome() {
            self.currentState = 'Home';
            $location.url(APP_STATE.HOME);
        }

        function goToUserActivation() {
            self.currentState = 'Liberação de Usuários';
            $location.url(APP_STATE.USER_ACTIVATION);
        }

        function logout() {
            var authenticatorResource = RestResourceService.getAuthenticatorResource();
            authenticatorResource.invalidate(function(response) {
                if (response.data) {
                    goToLogin();
                }
            });
        }
    }

}());
