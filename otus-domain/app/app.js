(function() {

    angular
        .module('otusDomain', [
            /* External modules */
            'dependencies',
            /* Application modules */
            'otusDomain.dashboard',
            'otusDomain.authenticator',
            'otusDomain.installer',
            'otusDomain.repository',
            'otusDomain.project',
            /* Possibly shared modules */
            'otusDomainClient',
            'otus.client',
            'user',
            'utils'
        ]);

}());
