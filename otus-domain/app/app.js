(function() {

    angular
        .module('otusDomain', [
          /* External modules */
          'dependencies',
          /* Application modules */
          'otusjs',
          'otusDomain.dashboard',
          'otusDomain.rest',
          'otusDomain.authenticator',
          'otusDomain.installer',
          'otusDomain.repository',
          'otusDomain.project',
          'otusDomain.project.fieldCenter',
          /* Possibly shared modules */
          'otusDomain.project.configuration',
          'otusDomain.project.datasource',
          'otus.domain.client',
          'otus.client',
          'otusDomain.user',
          'utils',
          'ngMaterial'
        ]);

}());
