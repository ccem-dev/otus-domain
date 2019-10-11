(function () {
  'use strict'

  angular
    .module('otusDomain.dashboard')
    .service('activitySettingsService', Service);

  Service.$inject = [];

  function Service() {
    const self = this;

    self.$onInit = onInit;
    self.getActivityReports = getActivityReports;


    function onInit() {
    }

    function getActivityReports(acronym, st) {
      let status = st

      switch (status) {
        case 1 :
          return []
          break;

        case 2 :
          return [
            new ActivityReport({
              id: 1,
              acronym: "RCPC",
              label: "template versão 1",
              sendingDate: new Date(),
              versions: [1]
            }),
            new ActivityReport({
              id: 2,
              acronym: "RCPC",
              label: "template versão 3",
              sendingDate: new Date(),
              versions: [3, 4]
            }),
            new ActivityReport({
              id: 3,
              acronym: "RCPC",
              label: "template versão 2",
              sendingDate: new Date(),
              versions: [2]
            })
          ];
          break;
      }
    }

    function ActivityReport(obj) {
      var self = this;
      var _currentVersions = obj.versions;

      self.id = obj.id;
      self.template = obj.template;
      self.label = obj.label;
      self.sendingDate = obj.sendingDate;
      self.acronym = obj.acronym;
      self.versions = obj.versions;
      self.datasources = obj.datasources;

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

  }

})();