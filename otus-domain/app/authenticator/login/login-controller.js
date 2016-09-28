(function() {
    'use strict';

    angular
        .module('otusDomain.authenticator')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'DashboardStateService', 'RestResourceService', '$mdToast', 'UserService'];

    function LoginController($scope, DashboardStateService, RestResourceService, $mdToast, UserService) {
        var LOGIN_ERROR_MESSAGE = 'Login Inválido! Verifique os dados informados.';

        $scope.authenticate = function(user) {
            UserService.authenticate(user).then(function() {
                DashboardStateService.goToHome();
            }, function() {
                $mdToast.show($mdToast.simple().textContent(LOGIN_ERROR_MESSAGE));
            });
        };

        $scope.register = function() {
            DashboardStateService.goToUserRegister();
        };
    }
})();
