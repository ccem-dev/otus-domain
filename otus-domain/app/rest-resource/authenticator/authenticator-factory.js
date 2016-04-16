    (function() {
        'use strict';

        angular
            .module('otusDomain.restResource')
            .factory('AuthenticatorResourceFactory', AuthenticatorResourceFactory);

        AuthenticatorResourceFactory.$inject = ['$resource'];

        function AuthenticatorResourceFactory($resource) {
            var HOSTNAME = 'http://' + window.location.hostname;
            var CONTEXT = '/otus-domain-rest';
            var VERSION = '/v01';
            var SUFFIX = '/authentication';
            var REST_URL = HOSTNAME + CONTEXT + VERSION + SUFFIX;

            var self = this;
	    self.create = create;

            function create() {
                return $resource(REST_URL, {}, {
                    authenticate : {
                        method: 'POST'
                    }
                });
            }

	    return self;
        }

    }());
