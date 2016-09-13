(function() {
    angular
        .module('user.management')
        .controller('UserRegisterController', UserRegisterController);

    UserRegisterController.$inject = ['$http', '$mdDialog', 'DashboardStateService', 'RestResourceService'];

    function UserRegisterController($http, $mdDialog, DashboardStateService, RestResourceService) {
        var successMessage = 'Sua liberação está pendente de aprovação.';
        var self = this;

        /* Public interface */
        self.register = register;
        self.back = back;

        function register(user) {
            var userResource = RestResourceService.getUserResource();
            userResource.create(user, function(response) {
                if (response.data) {
                    confirmAlertRegister();
                }
            });
        }

        function back() {
            DashboardStateService.goToLogin();
        }

        /* Private implementations */
        function confirmAlertRegister() {
            var alert = $mdDialog.alert().title('Informação').content(successMessage).ok('ok');
            $mdDialog
                .show(alert)
                .finally(function() {
                    DashboardStateService.goToLogin();
                });
        }
    }
})();
