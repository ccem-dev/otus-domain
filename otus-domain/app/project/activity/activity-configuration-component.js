(function() {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('activityConfiguration', {
      controller: Controller,
      templateUrl: 'app/project/activity/activity-configuration-template.html'
    });

  function Controller() {
    var self = this;
  }
}());
