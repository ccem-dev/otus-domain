(function() {
    'use strict';

    angular
        .module('otusDomain.installer')
        .controller('InitialConfigController', InitialConfigController);

    InitialConfigController.$inject = ['$q', '$mdToast', '$scope', '$mdDialog', 'DashboardStateService', 'RestResourceService'];

    function InitialConfigController($q, $mdToast, $scope, $mdDialog, DashboardStateService, RestResourceService) {
        self = this;
        var successMessage = 'Seu cadastro foi realizado com sucesso! Você vai ser redirecionado para a tela de login.';
        var errorMessage = 'Houve um erro ao instalar seu projeto. Verifique os dados informados';
        var repositoryResource;
        var installerResource;

        self.register = register;
        self.validateEmailService = validateEmailService;
        self.validateCredentials = validateCredentials;
        self.validateRepositoryConnection = validateRepositoryConnection;
        self.validateEmailService = validateEmailService;

        init();

        function init() {
            repositoryResource = RestResourceService.getRepositoryResource();
            installerResource = RestResourceService.getInstallerResource();
        }

        function register (systemConf) {
            $scope.isLoading = true;

            installerResource.config(systemConf, function(response) {
                if (response.data) {
                    _successNavigation();

                } else {
                    _messageError(response.MESSAGE);
                }
                $scope.isLoading = false;
            });
        }


        function _messageError(message) {
            $mdToast.show(
                $mdToast.simple()
                .textContent(errorMessage)
            );
        }

        function _successNavigation() {
            var alert = $mdDialog.alert()
                .title('Informação')
                .content(successMessage)
                .ok('ok');

            $mdDialog
                .show(alert)
                .finally(function() {
                    DashboardStateService.goToLogin();
                });
        }

        function validateEmailService(emailSender) {
            installerResource.validationEmail(emailSender, function(response) {
                validationEmailService(response.data);
            });
        }

        function validateCredentials(repository) {
            repositoryResource.validateCredentials(repository, function(response) {
                validationCredentials(response.data);
            });
        }

        function validateRepositoryConnection(repository) {
            repositoryResource.validateConnection(repository, function(response) {
                validationRepositoryConnection(response.data);
            });
        }

        function validationEmailService(isValid) {
            $scope.initialConfigSystemForm.emailSenderEmail.$setValidity('emailService', isValid);
            $scope.initialConfigSystemForm.$setValidity('emailService', isValid);
        }

        function validationCredentials(isValid) {
            $scope.initialConfigSystemForm.repositoryUsername.$setValidity('credentials', isValid);
            $scope.initialConfigSystemForm.repositoryPassword.$setValidity('credentials', isValid);
            $scope.initialConfigSystemForm.$setValidity('credentials', isValid);
        }

        function validationRepositoryConnection(isValid) {
            $scope.initialConfigSystemForm.repositoryHost.$setValidity('connection', isValid);
            $scope.initialConfigSystemForm.repositoryPort.$setValidity('connection', isValid);
            $scope.initialConfigSystemForm.$setValidity('credentials', isValid);
        }
    }

})();
