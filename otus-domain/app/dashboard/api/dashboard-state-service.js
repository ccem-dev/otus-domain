(function() {
    'use strict';

    angular
        .module('otusDomain.dashboard')
        .service('DashboardStateService', DashboardStateService);

    DashboardStateService.$inject = [
        '$state',
        '$http',
        'APP_STATE',
        'RestResourceService',
        'OtusRestResourceService',
        '$window',
        '$rootScope'
    ];

    function DashboardStateService($state, $http, APP_STATE, RestResourceService, OtusRestResourceService, $window, $rootScope) {
        var self = this;

        /* Public interface */
        self.goToLogin = goToLogin;
        self.goToHome = goToHome;
        self.goToInstaller = goToInstaller;
        self.goToUserRegister = goToUserRegister;
        self.goToUserActivation = goToUserActivation;
        self.goToProjectCenters = goToProjectCenters;
        self.logout = logout;

        init();

        function init() {
            self.currentState = 'Login';
        }

        function goToLogin() {
            self.currentState = 'Login';
            $state.go(APP_STATE.LOGIN);
        }

        function goToInstaller() {
            self.currentState = 'Instalador do Sistema';
            $state.go(APP_STATE.INSTALLER);
        }

        function goToUserRegister() {
            self.currentState = 'Cadastro de Usuário';
            $state.go(APP_STATE.USER_REGISTER);
        }

        function goToHome() {
            self.currentState = 'Home';
            $state.go(APP_STATE.HOME);
        }

        function goToUserActivation() {
            self.currentState = 'Liberação de Usuários';
            $state.go(APP_STATE.USER_ACTIVATION);
        }

        function goToProjectCenters() {
            self.currentState = 'Centros';
            $state.go(APP_STATE.PROJECT_CENTER);
        }

        function logout() {
            var authenticatorResource = RestResourceService.getAuthenticatorResource();
            authenticatorResource.invalidate(function(response) {
                RestResourceService.removeSecurityToken();
                OtusRestResourceService.removeSecurityProjectToken();

                goToLogin();
            });
        }

        $rootScope.$on('$stateChangeError', function(evt, to, toParams, from, fromParams, error) {
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
