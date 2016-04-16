    (function() {
        'use strict';

        angular
            .module('otusDomain.restResource')
            .factory('InstallerResourceFactory', InstallerResourceFactory);

        InstallerResourceFactory.$inject = ['$resource'];

        function InstallerResourceFactory($resource) {
            var HOSTNAME = 'http://' + window.location.hostname;
            var CONTEXT = '/otus-domain-rest';
            var VERSION = '/v01';
            var SUFFIX = '/installer';
            var REST_URL = HOSTNAME + CONTEXT + VERSION + SUFFIX;

            var self = this;
	    self.create = create;

            function create() {
                return $resource(REST_URL, {}, {
                    ready : {
                        method: 'GET'
                    }
                });
            }

	    return self;
        }

    }());
