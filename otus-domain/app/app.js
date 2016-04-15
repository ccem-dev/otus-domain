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
            /* Possibly shared modules */
            'user',
            'utils'
        ]);

}());
