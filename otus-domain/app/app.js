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
            'otus.domain.client',
            'otus.client',
            'user',
            'utils',
        ]);

}());
