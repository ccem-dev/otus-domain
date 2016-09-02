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

    // TODO Extract to external file
    angular
        .module('user.management')
        .directive(
            'unique', ['$http', '$q', 'RestResourceService',
                function($http, $q, RestResourceService) {


                    return {
                        restrict: 'A',
                        require: 'ngModel',
                        link: function(scope, element, attrs, ctrl) {
                            ctrl.$asyncValidators.emailInUse = function(modelValue) {
                                var deferred = $q.defer();
                                var userRestResource = RestResourceService.getUserResource();

                                userRestResource.exist({
                                    'email': modelValue
                                }, function(response) {
                                    if (response.data) {
                                        deferred.reject();
                                    } else {
                                        deferred.resolve();
                                    }
                                });

                                return deferred.promise;
                            };
                        }
                    };
                }
            ]);
})();
