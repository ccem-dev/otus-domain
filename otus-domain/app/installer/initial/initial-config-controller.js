(function() {
    'use strict';

    angular
        .module('otusDomain.installer')
        .controller('InitialConfigController', InitialConfigController);

    InitialConfigController.$inject = ['$q', '$scope', '$mdDialog', 'DashboardStateService', 'RestResourceService'];

    function InitialConfigController($q, $scope, $mdDialog, DashboardStateService, RestResourceService) {

        var repositoryResource,
            installerResource;

        init();

        function init() {
            repositoryResource = RestResourceService.getRepositoryResource();
            installerResource = RestResourceService.getInstallerResource();
        }

        $scope.register = function(systemConf) {
            $scope.isLoading = true;
            $scope.validateEmailService(systemConf).then(function() {
                installerResource.config(systemConf, function(response) {
                        $scope.isLoading = false;
                        confirmAlertToNavigate();
                    },
                    function() {
                        $scope.isLoading = false;
                    });
            }, function() {
                $scope.isLoading = false;
            });
        };

        $scope.validateEmailService = function(systemConf) {
            var deferred = $q.defer();

            installerResource.validation(systemConf, function(response) {
                if (response.data) {
                    $scope.resetValidationEmail();
                    deferred.resolve(true);
                } else {
                    $scope.initialConfigSystemForm.emailSenderEmail.$setValidity('emailService', false);
                    deferred.reject(false);
                }
            });

            return deferred.promise;
        };

        $scope.resetValidationEmail = function() {
            $scope.initialConfigSystemForm.emailSenderEmail.$setValidity('emailService', true);
            $scope.initialConfigSystemForm.$setValidity('emailService', true);
        };

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

        /**
         *
         * RepositoryConfiguration
         * Precisa ser refatorado
         *
         */

        $scope.validateCredentials = function(repository) {
            repositoryResource.validateCredentials(repository, function(response) {
                showMessageCredentials(response.data);
            });
        };

        $scope.validateRepositoryConnection = function(repository) {
            repositoryResource.validateConnection(repository, function(response) {
                showMessageRepositoryConnection(response.data);
            });
        };

        function showMessageCredentials(isValid) {
            $scope.initialConfigSystemForm.repositoryUsername.$setValidity('credentials', isValid);
            $scope.initialConfigSystemForm.repositoryPassword.$setValidity('credentials', isValid);
        }

        function showMessageRepositoryConnection(isValid) {
            $scope.initialConfigSystemForm.repositoryHost.$setValidity('connection', isValid);
            $scope.initialConfigSystemForm.repositoryPort.$setValidity('connection', isValid);
        }
    }

})();
