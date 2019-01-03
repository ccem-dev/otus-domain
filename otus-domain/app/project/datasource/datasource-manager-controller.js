(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .controller('datasourceManagerController', Controller);

  Controller.$inject = [
    '$timeout',
    'DatasourceManagerService',
    'OtusRestResourceService',
    '$mdToast'
  ];

  function Controller($timeout,DatasourceManagerService, OtusRestResourceService, $mdToast) {
    var self = this;

    self.ready = false;
    self.error = false;
    self.datasources = [];
    self.uploadDatasource = {
      'callback': uploadDatasource,
      'type': '.csv'
    };

    self.$onInit = onInit;
    self.exportDatasource = exportDatasource;
    self.identificationData = identificationData;

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
      var formFile = {
        file : file,
        id : self.id,
        name : self.name};

      DatasourceManagerService.uploadDatasource(formFile)
        .then(function (datasource) {
          self.datasources.push(datasource);
          _messages("Dados salvo com sucesso.");
        })
        .catch(function (err) {
          _messages("Não foi possível salvar o dado: " + err);
        });
    }

    function identificationData(datasource) {
      self.id = datasource.id;
      self.name = datasource.name;
    }

    function exportDatasource(datasource) {
      var name = datasource.name+'_'.concat(new Date().toLocaleDateString());
      alasql('SELECT * INTO CSV("'+name+'.csv",{headers:false}) FROM ?', [datasource.data]);
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
