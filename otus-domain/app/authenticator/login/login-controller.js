(function() {
    'use strict';

    angular
        .module('otusDomain.authenticator')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$http', 'DashboardStateService', 'AuthenticatorResourceFactory', 'InstallerResourceFactory'];

    function LoginController($scope, $http, DashboardStateService, AuthenticatorResourceFactory, InstallerResourceFactory) {
        var HOSTNAME_REST = 'http://' + window.location.hostname;
        var HTTP_GET_IS_LOGGED = HOSTNAME_REST + '/otus-domain-rest/session/rest/authentication/isLogged';

        init();

        function init() {
            verifyInstalation();
        }

        function verifyInstalation() {
            var installerResource = InstallerResourceFactory.create();
            installerResource.ready(function(response) {
                if (response) {
                    DashboardStateService.goToLogin();
                } else {
                    DashboardStateService.goToInstaller();
                }
            });
        }

        $scope.authenticate = function(user) {
            var authenticator = AuthenticatorResourceFactory.create();
            authenticator.authenticate(user, function(response) {
                if (!response.hasErrors) {
                    DashboardStateService.goToHome();
                } else {
                    $scope.invalidLogin = true;
                }
            });
        };

        $scope.register = function() {
            DashboardStateService.goToUserRegister();
        };
    }

})();
