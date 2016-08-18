(function() {
    'use strict';

    angular
        .module('otusDomain.authenticator')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'DashboardStateService', 'RestResourceService', '$mdToast', 'user.UserService'];

    function LoginController($scope, DashboardStateService, RestResourceService, $mdToast, UserService) {
        var LOGIN_ERROR_MESSAGE = 'Login Inválido! Verifique os dados informados.';

        $scope.authenticate = function(user) {
            var authenticatorResource = RestResourceService.getAuthenticatorResource();

            authenticatorResource.authenticate(user, function(response) {
                UserService.setCurrentUser(response.data);
                RestResourceService.setSecurityToken(response.data.token);

                if (!response.hasErrors) {
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
