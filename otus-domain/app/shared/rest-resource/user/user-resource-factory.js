(function() {
    'use strict';

    angular
        .module('otusDomain.restResource')
        .factory('UserResourceFactory', UserResourceFactory);

    UserResourceFactory.$inject = ['$resource'];

    function UserResourceFactory($resource) {
        var SUFFIX = '/user';

        var self = this;
        self.create = create;

        function create(restPrefix) {
            return $resource({}, {}, {
                exists: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/exists'
                },
                create: {
                    method: 'POST',
                    url: restPrefix + SUFFIX
                },
                logged: {
                    method: 'GET',
                    url: restPrefix + SUFFIX
                },
                fetch: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/fetch'
                },
                enable: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/enable'
                },
                disable: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/disable'
                }
            });
        }

        return self;
    }

}());
