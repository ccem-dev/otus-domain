(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .service('ActivityConfigurationManagerService', Service);

  Service.$inject = [];

  function Service() {
    var self = this;


    self.$onInit = onInit;
    self.getSurveyToSettings = getSurveyToSettings;
    self.setSurveyToSettings = setSurveyToSettings;

    function onInit() {
      self.selectSurveyToSettings = null;
    }

    function getSurveyToSettings() {
      return self.selectSurveyToSettings || null;
    }

    function setSurveyToSettings(survey) {
      self.selectSurveyToSettings = survey;
    }


  }
}());
