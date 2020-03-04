(function () {

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
      'otusDomain.project.location',
      'otus.domain.client',
      'otus.client',
      'otusDomain.user',
      'otusDomain.utils',
      'ngMaterial',
      'ngSanitize',
      'md.data.table',
      'jm.i18next',
      'ngCookies'
    ]).run(Runner);

  Runner.$inject = [];

  function Runner() {
    window.i18next
      .use(window.i18nextBrowserLanguageDetector)
      .use(window.i18nextXHRBackend)

    window.i18next.init({
      fallbackLng: 'dev',
      backend: {
        loadPath: 'i18n/locales/pt-BR/translation.json'
      },
    }, function (err, t) {
      if (err)
        console.log(err);
    });
  }

}());
