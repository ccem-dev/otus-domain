(function() {
    'use strict';

    angular
        .module('otusDomain.authenticator')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'DashboardStateService', 'RestResourceService'];

    function LoginController($scope, DashboardStateService, RestResourceService) {
        init();

        function init() {
            verifyInstalation();
        }

        function verifyInstalation() {
            var installerResource = RestResourceService.getInstallerResource();
            installerResource.ready(function(response) {
                if (response.data) {
                    DashboardStateService.goToLogin();
                } else {
                    DashboardStateService.goToInstaller();
                }
            });
        }

        $scope.authenticate = function(user) {
            var authenticatorResource = RestResourceService.getAuthenticatorResource();

            authenticatorResource.authenticate(user, function(response) {
            RestResourceService.setSecurityToken(response.data);
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
