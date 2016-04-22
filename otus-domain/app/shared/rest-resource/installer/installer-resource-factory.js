(function() {
    'use strict';

    angular
        .module('otusDomain.restResource')
        .factory('InstallerResourceFactory', InstallerResourceFactory);

    InstallerResourceFactory.$inject = ['$resource'];

    function InstallerResourceFactory($resource) {
        var SUFFIX = '/installer';

        var self = this;
        self.create = create;

        function create(restPrefix) {
            return $resource({}, {}, {
                ready: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/ready'
                },
                validation: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/validation'
                },
                config: {
                    method: 'POST',
                    url: restPrefix + SUFFIX
                }
            });
        }

        return self;
    }

}());
