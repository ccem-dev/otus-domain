(function() {
    var HOSTNAME_REST = 'http://' + window.location.hostname;

    angular
        .module('user.management')
        .controller('UserRegisterController', UserRegisterController);

    UserRegisterController.$inject = ['$http', '$mdDialog', 'DashboardStateService'];

    function UserRegisterController($http, $mdDialog, DashboardStateService) {
        var self = this;

        var $HTTP_POST_URL_CREATE = HOSTNAME_REST + '/otus-domain-rest/session/rest/register/user';

        /* Public interface */
        self.register = register;
        self.back = back;

        function register(user) {
            $http.post($HTTP_POST_URL_CREATE, user).then(function(response) {
                confirmAlertRegister();
            });
        }

        function back() {
            DashboardStateService.goToLogin();
        }

        /* Private implementations */
        function confirmAlertRegister() {
            alert = $mdDialog.alert().title('Informação').content('Sua liberação está pendente de aprovação.').ok('ok');
            $mdDialog
                .show(alert)
                .finally(function() {
                    DashboardStateService.goToLogin();
                });
        }
    }

    angular
        .module('user.management')
        .directive(
            'unique', ['$http', '$q',
                function($http, $q) {

                    var $HTTP_POST_URL_VALIDATE = HOSTNAME_REST + '/otus-domain-rest/session/rest/register/user/email/exists';

                    return {
                        restrict: 'A',
                        require: 'ngModel',
                        link: function(scope, element, attrs, ctrl) {
                            ctrl.$asyncValidators.emailInUse = function(modelValue, viewValue) {
                                var deferred = $q.defer();

                                $http.get($HTTP_POST_URL_VALIDATE, {
                                    params: {
                                        email: modelValue
                                    }
                                }).then(
                                    function(response) {
                                        if (response.data.data) {
                                            deferred.reject();
                                        } else {
                                            deferred.resolve();
                                        }
                                    },
                                    function(error) {
                                        console.log('erro');
                                    });

                                return deferred.promise;
                            };
                        }
                    };
                }
            ]);
})();
