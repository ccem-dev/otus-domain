    (function() {
        'use strict';

        angular
            .module('otusDomain.restResource')
            .service('RestResourceService', RestResourceService);

        RestResourceService.$inject = ['InstallerResourceFactory', 'AuthenticatorResourceFactory', 'UserResourceFactory', 'RepositoryResourceFactory'];

        function RestResourceService(InstallerResourceFactory, AuthenticatorResourceFactory, UserResourceFactory, RepositoryResourceFactory) {
            var HOSTNAME = 'http://' + window.location.hostname;
            var CONTEXT = '/otus-domain-rest';
            var VERSION = '/v01';

            var self = this;
            self.getInstallerResource = getInstallerResource;
            self.getAuthenticatorResource = getAuthenticatorResource;
            self.getUserResource = getUserResource;
            self.getRepositoryResource = getRepositoryResource;

            function getRestPrefix() {
                return HOSTNAME + CONTEXT + VERSION;
            }

            function getHostName() {
                return HOSTNAME;
            }

            function getContext() {
                return CONTEXT;
            }

            function getVersion() {
                return VERSION;
            }

            function getInstallerResource() {
                var prefix = getRestPrefix();
                return InstallerResourceFactory.create(prefix);
            }

            function getAuthenticatorResource() {
                var prefix = getRestPrefix();
                return AuthenticatorResourceFactory.create(prefix);
            }

            function getUserResource() {
                var prefix = getRestPrefix();
                return UserResourceFactory.create(prefix);
            }

            function getRepositoryResource() {
                var prefix = getRestPrefix();
                return RepositoryResourceFactory.create(prefix);
            }
        }

    }());
