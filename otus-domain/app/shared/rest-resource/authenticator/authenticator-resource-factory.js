(function() {
    'use strict';

    angular
        .module('otusDomain.restResource')
        .factory('AuthenticatorResourceFactory', AuthenticatorResourceFactory);

    AuthenticatorResourceFactory.$inject = ['$resource'];

    function AuthenticatorResourceFactory($resource) {
        var SUFFIX = '/authentication';

        var self = this;
        self.create = create;

        function create(restPrefix) {
            return $resource({}, {}, {
                authenticate: {
                    method: 'POST',
                    url: restPrefix + SUFFIX
                },
                invalidate: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/invalidate'
                }
            });
        }

        return self;
    }

}());
