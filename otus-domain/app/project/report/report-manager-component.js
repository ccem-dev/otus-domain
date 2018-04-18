(function() {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('reportManager', {
      controller: "reportManagerController as $ctrl",
      templateUrl: 'app/project/report/report-manager-template.html'
    });

}());
