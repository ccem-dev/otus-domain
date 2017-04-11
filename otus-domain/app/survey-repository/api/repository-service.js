(function() {
    'use strict';

    angular
        .module('otusDomain.repository')
        .service('RepositoryService', RepositoryService);

    RepositoryService.$inject = ['RestResourceService'];

    function RepositoryService(RestResourceService) {
        var self = this;
        var repositoryResource;
        // Public interface
        self.createRepository = createRepository;
        self.validateRepositoryConnection = validateRepositoryConnection;
        self.validateIfRepositoryAlreadyExists = validateIfRepositoryAlreadyExists;
        self.validateRepositoryCredentials = validateRepositoryCredentials;

        init();

        function init() {
            repositoryResource = RestResourceService.getRepositoryResource();
        }

        function createRepository(repository) {
            repositoryResource.create(repository, function(response) {
                return !response.data.hasError;
            });
        }

        function validateRepositoryConnection(repository) {
            repositoryResource.validateConnection(repository, function(response) {
                return response.data;
            });
        }

        function validateIfRepositoryAlreadyExists(repository) {
            repositoryResource.getByRepositoryName({
                    'repositoryName': repository.name
                },
                function(response) {
                    return response.data;
                });
        }

        function validateRepositoryCredentials(repository) {
            repositoryResource.validateCredentials(repository, function(response) {
                return response.data;
            });
        }
    }

})();
