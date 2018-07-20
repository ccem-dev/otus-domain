(function () {
  'use strict';

  angular
    .module('otusDomain.project.configuration')
    .component('otusParticipantRegister', {
      controller: Controller,
      templateUrl: 'app/project/configuration/config-components/participant-register/participant-register-template.html'
    });

  Controller.$inject = [];

  function Controller() {
    var self = this;

    /* Public methods */
    self.handleViewInfoAction = handleViewInfoAction;

    function handleViewInfoAction() { }
  }
}());