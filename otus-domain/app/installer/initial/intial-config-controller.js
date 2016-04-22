(function() {
    'use strict';

    angular
        .module('otusDomain.installer')
        .controller('InitialConfigController', InitialConfigController);

    InitialConfigController.$inject = ['$q', '$scope', '$mdDialog', 'DashboardStateService', 'RestResourceService'];

    function InitialConfigController($q, $scope, $mdDialog, DashboardStateService, RestResourceService) {
        $scope.systemConf = {};
        $scope.systemConf.user = {};
        $scope.systemConf.emailSender = {};

        function confirmAlertToNavigate() {
            alert = $mdDialog.alert()
                .title('Informação')
                .content('Seu cadastro foi realizado com sucesso! Você vai ser redirecionado para a tela de login.')
                .ok('ok');

            $mdDialog
                .show(alert)
                .finally(function() {
                    DashboardStateService.goToLogin();
                });
        }

        $scope.register = function(systemConf) {
            $scope.isLoading = true;
            $scope.validateEmailService(systemConf).then(function() {

                var installerResource = RestResourceService.getInstallerResource();
                installerResource.config(systemConf, function(response) {
                    $scope.isLoading = false;
                    confirmAlertToNavigate();
                });
            });
        };

        $scope.validateEmailService = function(systemConf) {
            var deferred = $q.defer();

            if (systemConf.emailSender.email && systemConf.emailSender.password && systemConf.emailSender.passwordConfirm) {

                var installerResource = RestResourceService.getInstallerResource();
                installerResource.validation(systemConf, function(response) {
                    if (!response.hasError) {
                        $scope.resetValidationEmail();
                        deferred.resolve(true);

                    } else {
                        $scope.initialConfigSystemForm.emailSenderEmail.$setValidity('emailService', false);
                        $scope.initialConfigSystemForm.$setValidity('emailService', false);
                        deferred.reject(false);
                    }
                });

                return deferred.promise;
            }
        };

        $scope.resetValidationEmail = function() {
            $scope.initialConfigSystemForm.emailSenderEmail.$setValidity('emailService', true);
            $scope.initialConfigSystemForm.$setValidity('emailService', true);
        };
    }

})();
