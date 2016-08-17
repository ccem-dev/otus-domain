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
            'otusDomain.project.fieldCenter',
            /* Possibly shared modules */
            'otusDomainClient',
            'otus.client',
            'otusDomain.user',
            'utils'
        ]);

}());
