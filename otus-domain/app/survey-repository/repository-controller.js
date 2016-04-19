(function() {
    'use strict';

    angular
        .module('otusDomain.repository')
        .controller('RepositoryController', RepositoryController);

    RepositoryController.$inject = ['$scope', '$http', '$location', '$mdDialog', '$rootScope', 'RepositoryService', 'RestResourceService'];

    function RepositoryController($scope, $http, $location, $mdDialog, $rootScope, RepositoryService, RestResourceService) {
        var SUCCESS_MESSAGE = 'Repositório adicionado com sucesso.';
        var REPOSITORY_CONNECT_ACTION = 'CONNECT';
        var REPOSITORY_CREATE_ACTION = 'CREATE';
        var self = this;
        $scope.pageMessage = angular.equals($scope.actionType, REPOSITORY_CREATE_ACTION) ? "Criação de Repositório" : "Adição de Repositório";
        self.connected = connected;

        init();

        $scope.actionButton = function(repository) {
            getActionType();
            if (angular.equals($scope.actionType, REPOSITORY_CONNECT_ACTION)) {
                connectRepository(repository);

            } else if (angular.equals($scope.actionType, REPOSITORY_CREATE_ACTION)) {
                createRepository(repository);
            }
        };

        function connectRepository(repository) {
            var repositoryResource = RestResourceService.getRepositoryResource();

            repositoryResource.connect(repository, function(response) {
                if (!response.data.hasError) {
                    successMessage();
                }
            });
        }

        function createRepository(repository) {
            var repositoryResource = RestResourceService.getRepositoryResource();

            repositoryResource.create(repository, function(response) {
                if (!response.data.hasError) {
                    successMessage();
                }
            });
        }

        function connected() {
            return RepositoryService.connectedRepository;
        }

        $scope.setRepository = function(name) {
            RepositoryService.updateConnectedRepository(name);
        };

        $scope.validateDatabase = function validateDatabase(repository) {
            if ($scope.repository.database && $scope.repository.host && $scope.repository.port) {
                var repositoryResource = RestResourceService.getRepositoryResource();

                repositoryResource.validateConnection(repository, function(response) {
                    var validationConnection = response.data;
                    validateRepositoryConnection(validationConnection);

                    if (validationConnection) {
                        repositoryResource.getByRepositoryName({
                            'repositoryName': repository.name
                        }, function(response) {
                            validateExistDatabase(!response.data);
                        });
                    }
                });
            }
        };

        $scope.validateCredentials = function(repository) {
            if ($scope.repository.username && $scope.repository.password && $scope.repository.host && $scope.repository.port) {
                var repositoryResource = RestResourceService.getRepositoryResource();

                repositoryResource.validateCredentials(repository, function(response) {
                    $scope.repositoryForm.username.$setValidity('credentials', response.data);
                    $scope.repositoryForm.password.$setValidity('credentials', response.data);
                });
            }
        };

        $scope.existRepository = function(repository) {
            var repositoryResource = RestResourceService.getRepositoryResource();

            repositoryResource.getByRepositoryName({
                'repositoryName': repository.name
            }, function(response) {
                validateExistRepository(!response.data);
            });
        };

        function init() {
            $scope.connectedRepository = RepositoryService.connectedRepository;
            getActionType();
        }

        function getActionType() {
            $scope.actionType = $location.search().actionType;
        }

        function validateExistRepository(valid) {
            $scope.repositoryForm.name.$setValidity('repositoryNameInUse', valid);
            $scope.repositoryForm.$setValidity('repositoryNameInUse', valid);
        }

        function validateRepositoryConnection(valid) {
            $scope.repositoryForm.host.$setValidity('connection', valid);
            $scope.repositoryForm.$setValidity('connection', valid);
        }

        function validateExistDatabase(valid) {
            $scope.repositoryForm.database.$setValidity('databaseAlreadyExist', valid);
            $scope.repositoryForm.$setValidity('databaseAlreadyExist', valid);
        }

        function successMessage() {
            alert = $mdDialog.alert()
                .title('Informação')
                .content(SUCCESS_MESSAGE)
                .ok('ok');

            $mdDialog.show(alert)
                .finally(function() {
                    $scope.repository = null;
                    $scope.repositoryForm.$setUntouched();
                });
        }
    }

}());
