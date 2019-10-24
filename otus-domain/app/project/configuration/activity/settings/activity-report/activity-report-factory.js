(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .factory('ActivityReportFactory', factory);

  function factory() {
    const self = this;

    self.create = create;

    function create(activityReportData) {
      return new ActivityReport(activityReportData);
    }
    return self;
  }

  function ActivityReport(activityReportData) {
    const self = this;
    var _currentVersions = activityReportData.versions;


    self.id = activityReportData._id;
    self.objectType = "ActivityReport";
    self.template = activityReportData.template;
    self.label = activityReportData.label;
    self.sendingDate = activityReportData.sendingDate;
    self.acronym = activityReportData.acronym;
    self.versions = activityReportData.versions;
    self.datasources = activityReportData.datasources;

    self.cancelUpdateVersion = cancelUpdateVersion;
    self.updateCurrentVersions = updateCurrentVersions;
    self.getCurrentVersions = getCurrentVersions;

    function cancelUpdateVersion() {
      self.versions = _currentVersions;
    }

    function updateCurrentVersions() {
      _currentVersions = self.versions;
    }

    function getCurrentVersions() {
      return _currentVersions;
    }

    return self;
  }

})();