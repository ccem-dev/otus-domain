(function() {
    'use strict';

    angular
        .module('otusDomain.dashboard')
        .service('DashboardStateService', DashboardStateService);

    DashboardStateService.$inject = [
        '$location',
        '$http',
        'APP_STATE'
    ];

    function DashboardStateService($location, $http, APP_STATE) {
        var self = this;

        var HOSTNAME_REST = 'http://' + window.location.hostname;

        /* Public interface */
        self.goToLogin = goToLogin;
        self.goToHome = goToHome;
        self.goToInstaller = goToInstaller;
        self.goToUserRegister = goToUserRegister;
        self.goToCreateRepository = goToCreateRepository;
        self.goToConnectRepository = goToConnectRepository;
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

        function goToCreateRepository() {
            self.currentState = 'Criação de novo Repositório';
            $location.url(APP_STATE.CREATE_REPOSITORY);
        }

        function goToConnectRepository() {
            self.currentState = 'Adição de Repositório existente';
            $location.url(APP_STATE.CONNECT_REPOSITORY);
        }

        function goToUserActivation() {
            self.currentState = 'Liberação de Usuários';
            $location.url(APP_STATE.USER_ACTIVATION);
        }

        function logout() {
            $http.post(HOSTNAME_REST + APP_STATE.LOGOUT).then(function(response) {
                if (response.data.data) {
                  goToLogin();
                }
            });
        }
    }

}());
