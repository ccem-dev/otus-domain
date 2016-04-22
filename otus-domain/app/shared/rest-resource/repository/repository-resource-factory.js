(function() {
    'use strict';

    angular
        .module('otusDomain.restResource')
        .factory('RepositoryResourceFactory', RepositoryResourceFactory);

    RepositoryResourceFactory.$inject = ['$resource'];

    function RepositoryResourceFactory($resource) {
        var SUFFIX = '/repository';

        var self = this;
        self.create = create;

        function create(restPrefix) {
            return $resource({}, {}, {
                validateConnection: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/validate/connection'
                },
                validateCredentials: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/validate/credentials'
                },
                validateDatabase: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/validate/database'
                },
                getByRepositoryName: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/get'
                },
                connect: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/connect'
                },
                create: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/create'
                }
            });
        }

        return self;
    }

}());
