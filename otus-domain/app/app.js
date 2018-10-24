(function() {

    angular
        .module('otusDomain', [
          /* External modules */
          'dependencies',
          /* Application modules */
          'otusjs',
          'otusDomain.dashboard',
          'otusDomain.authenticator',
          'otusDomain.installer',
          'otusDomain.repository',
          'otusDomain.project',
          'otusDomain.project.fieldCenter',
          /* Possibly shared modules */
          'otusDomain.project.configuration',
          'otus.domain.client',
          'otus.client',
          'otusDomain.user',
          'utils',
          'ngMaterial'
        ]);

}());
