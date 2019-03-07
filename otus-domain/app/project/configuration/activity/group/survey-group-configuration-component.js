(function () {
  'use strict';

  angular
    .module('otusDomain.project')
    .component('surveyGroupConfiguration', {
      controller: 'surveyGroupConfigurationCtrl as $ctrl',
      templateUrl: 'app/project/configuration/activity/group/survey-group-configuration-template.html'
    });
}());