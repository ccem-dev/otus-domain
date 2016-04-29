(function() {
    'use strict';

    angular
        .module('otusDomain.repository')
        .controller('RepositoryController', RepositoryController);

    function RepositoryController() {
        var self = this;


        function validateExistRepository(valid) {
            initialConfigSystemForm.repository.name.$setValidity('repositoryNameInUse', valid);
            initialConfigSystemForm.$setValidity('repositoryNameInUse', valid);
        }

        function validateRepositoryConnection(valid) {
            initialConfigSystemForm.repository.host.$setValidity('connection', valid);
            initialConfigSystemForm.$setValidity('connection', valid);
        }

        function validateExistDatabase(valid) {
            initialConfigSystemForm.repository.database.$setValidity('databaseAlreadyExist', valid);
            initialConfigSystemForm.repository.$setValidity('databaseAlreadyExist', valid);
        }
    }

}());
