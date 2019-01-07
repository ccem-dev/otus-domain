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
    self.pointAndComma = ';';
    self.comma = ',';
    self.datasources = [];
    self.disableSaving = true;
    self.identification = false;
    self.uploadDatasource = {
      'callback': uploadDatasource,
      'type': '.csv'
    };

    self.$onInit = onInit;
    self.exportDatasource = exportDatasource;
    self.identificationData = identificationData;
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
      var formdata = new FormData();
      self.delimiter = self.pointAndComma;

      formdata.append('file',file);
      formdata.append('id ',self.id);
      formdata.append('name',self.name);
      formdata.append('delimiter',self.delimiter);

      if(self.identification){
        self.identification = false;

        DatasourceManagerService.updateDatasource(formdata)
          .then(function (datasource) {
            // self.datasources.push(datasource);
            // _getDatasourceList();
            _messages("Dados salvo com sucesso.");
          })
          .catch(function (err) {
            _messages("Não foi possível salvar o dado: " + err);
          });
      }else {
        console.log('Passou');
        DatasourceManagerService.createDatasource(formdata)
          .then(function (datasource) {
            // self.datasources.push(datasource);
            _messages("Dados salvo com sucesso.");
          })
          .catch(function (err) {
            _messages("Não foi possível salvar o dado: " + err);
          });
      }

    }

    function identificationData(datasource) {
      self.id = datasource.id;
      self.name = datasource.name;
      self.identification = true;
    }

    function publishDatasource() {

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
