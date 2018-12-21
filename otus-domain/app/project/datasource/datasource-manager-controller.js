(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .controller('datasourceManagerController', Controller);

  Controller.$inject = [
    'DatasourceManagerService',
    '$mdDialog',
    'OtusRestResourceService',
    '$mdToast'
  ];

  function Controller(DatasourceManagerService, $mdDialog, OtusRestResourceService, $mdToast) {
    var self = this;
    var confirmDialog;

    self.ready = false;
    self.error = false;
    self.disableSaving = true;
    self.datasources = [];
    self.uploadDatasource = {
      'callback': uploadDatasource,
      'type': '.csv'
    };

    self.$onInit = onInit;
    self.exportDatasource = exportDatasource;
    self.publishDatasource = publishDatasource;

    function onInit() {
      _getDatasourceList();
    }

    function _getDatasourceList() {
      DatasourceManagerService.getDatasourceList()
        .then(function (datasourceList) {
          self.ready = true;
          self.datasources = datasourceList;
           if (self.datasources.length === 0) {
            _messages('Nenhuma fonte de dados adicionado');
          }
        })
        .catch(function (err) {
          self.error = true;
        });
    }

    function uploadDatasource(file) {
      DatasourceManagerService.uploadDatasources(file)
        .then(function (datasource) {
          self.datasources.push(datasource);
          self.disableSaving = false;
          _messages("Dados salvo com sucesso.");
        })
        .catch(function (err) {
          _messages("Não foi possível salvar o dado: " + err);
        });
    }

    function publishDatasource() {

    }

    function exportDatasource(datasource) {
      var name = datasource.name+'_'.concat(new Date().toLocaleDateString());
      alasql('SELECT [value] AS [Nome] INTO CSV("'+name+'.csv",{headers:true}) FROM ?', [datasource.data]);
    }

    function _confirmUpdateDialog() {
      confirmDialog = $mdDialog.confirm()
        .title('Atualizar Dados')
        .textContent('Você tem certeza que deseja atualizar esse Dados?')
        .ariaLabel('atualização de dados')
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
