(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .service('ReportManagerService', Service);

  Service.$inject = [
    'ReportRestService',
    'ReportFactory',
    '$q'
  ];

  function Service(ReportRestService, ReportFactory, $q) {
    var self = this;

    self.getReportList = getReportList;
    self.uploadReport = uploadReport;
    self.updateReport = updateReport;
    self.deleteReport = deleteReport;

    onInit();

    function onInit() {
      ReportRestService.initialize();
    }

    function getReportList() {
      return ReportRestService.list()
        .then(function (response) {
          const reportList = response.data;
          return reportList.map(function (reportData) {
            return ReportFactory.create(reportData);
          });
        })
        .catch(function (e) {
          throw e;
        });
    }

    function uploadReport(file) {
      try {
        var report = ReportFactory.fromHtmlFile(file);
      } catch (err) {
        return $q.reject(err);
      }

      return ReportRestService.create(report)
        .then(function (response) {
          if (response.data) {
            report.refresh(response.data);
            return report;
          } else {
            return $q.reject(response.MESSAGE);
          }
        })
        .catch(function (e) {
          return $q.reject(e);
        });
    }

    function updateReport(report) {
      return ReportRestService.update(report)
        .then(function (response) {
          if (response.data) {
            report.refresh(response.data);
            return response.data;
          } else {
            return $q.reject(response.MESSAGE);
          }
        })
        .catch(function (e) {
          return $q.reject(e);
        });
    }

    function deleteReport(report) {
      return ReportRestService.remove(report.getId())
        .then(function (response) {
          if (response.data) {
            return response.data;
          } else {
            return $q.reject(response.MESSAGE);
          }
        })
        .catch(function (e) {
          return $q.reject(e);
        });
    }
  }
}());
