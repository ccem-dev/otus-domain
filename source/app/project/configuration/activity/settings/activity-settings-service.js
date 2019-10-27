(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .service('ActivitySettingsService', Service);

  Service.$inject = [
    'ActivityReportFactory'
  ];

  function Service(ActivityReportFactory) {
    const self = this;
    let activityReports = [];

    self.getActivityReports = getActivityReports;

    function getActivityReports(jsonActivityReports){
      activityReports = [];
      if(jsonActivityReports.length){
        jsonActivityReports.forEach(report =>{
          activityReports.push(ActivityReportFactory.create(report));
        });
      }
      return activityReports;
    }
  }
})();