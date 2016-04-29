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
        //    $scope.validateCredentials(systemConf.repository).then(function() {
                $scope.validateEmailService(systemConf).then(function() {
                    installerResource.config(systemConf, function(response) {
                        $scope.isLoading = false;
                        confirmAlertToNavigate();
                    });
                });
        //    });
        };

        $scope.validateEmailService = function(systemConf) {
            var deferred = $q.defer();

            installerResource.validation(systemConf, function(response) {
                if (!response.hasError) {
                    $scope.resetValidationEmail();
                    deferred.resolve(true);

                } else {
                    $scope.initialConfigSystemForm.emailSenderEmail.$setValidity('emailService', false);
                    $scope.initialConfigSystemForm.$setValidity('emailService', false);
                    deferred.reject(false);
                    $scope.isLoading = false;
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
            var deferred = $q.defer();
            repositoryResource.validateCredentials(repository, function(response) {
                if (response.data) {
                    console.log(response.data);
                    deferred.resolve(true);
                } else {
                    showMessageCredentials(response.data);
                    deferred.reject(false);
                    $scope.isLoading = false;
                }
            },
            function(error){
                    console.log('Ocorreu um erro inesperado, o servidor pode estar parado.');
            });
            return deferred.promise;
        };

        $scope.validateRepositoryConnection = function(repository) {
            repositoryResource.validateConnection(repository, function(response) {
                showMessageRepositoryConnection(response.data);
            });
        };

        function showMessageCredentials(isValid) {
            $scope.initialConfigSystemForm.repositoryUsername.$setValidity('credentials', isValid);
            $scope.initialConfigSystemForm.repositoryPassword.$setValidity('credentials', isValid);
            $scope.initialConfigSystemForm.$setValidity('credentials', true);
        }

        function showMessageRepositoryConnection(isValid) {
            $scope.initialConfigSystemForm.repositoryHost.$setValidity('connection', isValid);
            $scope.initialConfigSystemForm.repositoryPort.$setValidity('connection', isValid);
        }
    }

})();
