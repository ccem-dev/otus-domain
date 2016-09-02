(function() {
    'use strict';

    angular
        .module('otusDomain.authenticator')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'DashboardStateService', 'RestResourceService', '$mdToast'];

    function LoginController($scope, DashboardStateService, RestResourceService, $mdToast) {
        var LOGIN_ERROR_MESSAGE = 'Login Inválido! Verifique os dados informados.';

        $scope.authenticate = function(user) {
            var authenticatorResource = RestResourceService.getAuthenticatorResource();

            authenticatorResource.authenticate(user, function(response) {
                if (response.data) {
                    RestResourceService.setSecurityToken(response.data);
                    DashboardStateService.goToHome();
                } else {
                    $mdToast.show($mdToast.simple().textContent(LOGIN_ERROR_MESSAGE));
                }
            });
        };

        $scope.register = function() {
            DashboardStateService.goToUserRegister();
        };
    }
})();
