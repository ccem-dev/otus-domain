(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .service('ActivityConfigurationManagerService', Service);

  Service.$inject = [];

  function Service() {
    var self = this;
    self.survey;
    self.permission;

    self.$onInit = onInit;
    self.getSurveyOfContext = getSurveyOfContext;
    self.setSurveyInContext = setSurveyInContext;
    self.getPermissionOfContext = getPermissionOfContext;
    self.setPermissionInContext = setPermissionInContext;

    function onInit() {
      self.permission = null;
      self.survey = null;
    }

    function getSurveyOfContext() {
      return self.survey;
    }

    function setSurveyInContext(survey) {
      self.survey = survey;
    }

    function getPermissionOfContext() {
      return self.permission;
    }

    function setPermissionInContext(permission) {
      self.permission = permission;
    }

  }
}());
