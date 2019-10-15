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
    self.activityReports = [];

    self.$onInit = onInit;
    self.getActivityReports = getActivityReports;

    function onInit() {
    }

    function getActivityReports(jsonActivityReports){
      if(jsonActivityReports.length){
        jsonActivityReports.forEach(report =>{
          self.activityReports.push(ActivityReporFactory.create(report));
        });
      }
        return self.activityReports;
    }
  }
})();