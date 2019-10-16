(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .service('activitySettingsService', Service);

  Service.$inject = [
    'ActivityReporFactory'
  ];

  function Service(ActivityReporFactory) {
    const self = this;
    let activityReports = [];

    self.$onInit = onInit;
    self.getActivityReports = getActivityReports;

    function onInit() {
    }

    function getActivityReports(jsonActivityReports){
      activityReports = [];
      if(jsonActivityReports.length){
        jsonActivityReports.forEach(report =>{
          activityReports.push(ActivityReporFactory.create(report));
        });
      }
      return activityReports;
    }
  }
})();