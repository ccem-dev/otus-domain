(function() {
    'use strict';

    angular
        .module('otusDomain.authenticator')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$http', 'DashboardStateService'];

    function LoginController($scope, $http, DashboardStateService) {

        var HOSTNAME_REST = 'http://' + window.location.hostname;

        var HTTP_POST_URL = HOSTNAME_REST + '/otus-domain-rest/session/rest/authentication/login';
        var HTTP_GET_SYSTEM_CONFIG_STATUS = HOSTNAME_REST + '/otus-domain-rest/session/rest/system/config/ready';
        var HTTP_GET_IS_LOGGED = HOSTNAME_REST + '/otus-domain-rest/session/rest/authentication/isLogged';

        $http.get(HTTP_GET_SYSTEM_CONFIG_STATUS).then(function(response) {

            if (!response.data.data) {
                DashboardStateService.goToInstaller();
            } else {
                $http.get(HTTP_GET_IS_LOGGED).then(function(response) {
                    if (response.data.data) {
                        DashboardStateService.goToLogin();
                    }
                });
            }
        });

        $scope.authenticate = function(user) {
            $scope.invalidLogin = false;

            $http.post(HTTP_POST_URL, user).then(function(response) {

                if (response.data) {
                    DashboardStateService.goToHome();
                    $scope.invalidLogin = false;
                } else {
                    $scope.invalidLogin = true;
                }

            }, function(response) {
                console.log(response);
            });
        };

        $scope.register = function() {
            DashboardStateService.goToUserRegister();
        };
    }

})();
