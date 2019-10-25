(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .controller('reportManagerController', Controller);

  Controller.$inject = [
    'ReportManagerService',
    '$mdDialog',
    'OtusRestResourceService',
    '$mdToast'
  ];

  function Controller(ReportManagerService, $mdDialog, OtusRestResourceService, $mdToast) {
    var self = this;
    var confirmDialog;
    var _fieldCenterResource;

    self.ready = false;
    self.error = false;
    self.reports = [];
    self.reportsOld = [];
    self.uploadReport = {
      'callback': uploadReport,
      'type': '.html'
    };

    self.$onInit = onInit;
    self.$onDestroy = onDestroy;
    self.updateReport = updateReport;
    self.deleteReport = deleteReport;
    self.exportReport = exportReport;

    function onInit() {
      _fieldCenterResource = OtusRestResourceService.getOtusFieldCenterResource();
      _loadFieldCenters();
      ReportManagerService.getReportList()
        .then(function (reportList) {
          self.ready = true;
          self.reports = reportList;
          _save();
        })
        .catch(function (err) {
          self.error = true;
        });
    }

    function onDestroy() {
      self.reports = null;
    }


    function uploadReport(file) {
      ReportManagerService.uploadReport(file)
        .then(function (report) {
          self.reports.push(report);
          _save();
          _messages("Relatório salvo com sucesso.");
        })
        .catch(function (err) {
          _messages("Não foi possível salvar o relatório: " + err);
        });
    }

    function updateReport(report) {
      $mdDialog.show(_confirmUpdateDialog())
        .then(function () {
          ReportManagerService.updateReport(report)
            .then(function (result) {
              _save();
              _messages("Relatório alterado com sucesso.");
            })
            .catch(function (err) {
              _messages("Erro ao atualizar: " + err);
            });
        })
        .catch(function () {
          report.reload();
          _messages("Relatório não alterado!");
        });
    }

    function deleteReport(report, index) {
      $mdDialog.show(_confirmDeleteDialog())
        .then(function () {
          ReportManagerService.deleteReport(report)
            .then(function (result) {
              if (result) {
                self.reports.splice(index, 1);
              }
              _save();
              _messages("Relatório excluído com sucesso.");
            })
            .catch(function (err) {
              _messages("Erro ao excluir: " + err);
            });
        })
        .catch(function () {
          _reset();
          _messages("Relatório não excluído!!");
        });
    }

    function exportReport(report) {
      _downloadReport("report.html", report.toHtml());
    }


    function _save() {
      self.reportsOld = angular.copy(self.reports);
    }

    function _reset() {
      self.reports = angular.copy(self.reportsOld);
    }

    function _downloadReport(filename, json) {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(json));
      element.setAttribute('download', filename);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }

    function _loadFieldCenters() {
      _fieldCenterResource.getAll(function (httpResponse) {
        self.fieldCenters = httpResponse.data;
      });
    }

    function _confirmDeleteDialog() {
      confirmDialog = $mdDialog.confirm()
        .title('Exclusão de Relatório')
        .textContent('Você tem certeza que deseja excluir esse Relatório?')
        .ariaLabel('exclusão de relatório')
        .ok('Sim')
        .cancel('Não');
      return confirmDialog;
    }

    function _confirmUpdateDialog() {
      confirmDialog = $mdDialog.confirm()
        .title('Atualizar Relatório')
        .textContent('Você tem certeza que deseja atualizar esse Relatório?')
        .ariaLabel('atualização de relatório')
        .ok('Sim')
        .cancel('Não');
      return confirmDialog;
    }

    function _messages(msg) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(msg)
          .position('bottom left')
          .hideDelay(3000)
      );
    }

  }
}());
