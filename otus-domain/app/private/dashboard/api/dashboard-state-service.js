(function() {
    'use strict';

    angular
        .module('studio.dashboard')
        .service('DashboardStateService', DashboardStateService);

    DashboardStateService.$inject = [
        '$location',
        '$http',
        '$window',
        'APP_STATE'
    ];

    function DashboardStateService($location, $http, $window, APP_STATE) {
        var self = this;

        /* Public interface */
        self.goToHome = goToHome;
        self.goToCreateRepository = goToCreateRepository;
        self.goToConnectRepository = goToConnectRepository;
        self.goToUserManagement = goToUserManagement;
        self.logout = logout;

        init();

        function init() {
            self.currentState = 'Home';
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

        function goToUserManagement() {
            $location.url(APP_STATE.USER_MANAGEMENT);
        }

        function logout() {
            $http.post(APP_STATE.LOGOUT).then(function(response) {
                if (response.data.data) {
                    $window.location.href = window.location.origin + '/otus-domain/app/public/login.html';
                }
            });
        }
    }

}());
