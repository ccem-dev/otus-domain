(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('laboratoryConfiguration', {
      controller: 'laboratoryConfigurationCtrl as $ctrl',
      templateUrl: 'app/project/configuration/laboratory-configuration/laboratory-configuration-template.html'
    })
    .controller('laboratoryConfigurationCtrl', Controller);

  Controller.$inject = [
    '$q',
    '$mdToast',
    '$mdDialog',
    'otusDomain.LoadingScreenService',
    'otusDomain.rest.configuration.ProjectConfigurationService'
  ];

  function Controller($q, $mdToast, $mdDialog, LoadingScreenService, ProjectConfigurationService) {
    var self = this;
    var deleteConfirmDialog;

    // var ERROR_MESSAGE = 'Ocorreu algum problema, tente novamente mais tarde';
    var timeShowMsg = 5000;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* Public Interface*/


    function onInit() {

    }
  }
}());
