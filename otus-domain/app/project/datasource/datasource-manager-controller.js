(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .controller('datasourceManagerController', Controller);

  Controller.$inject = [
    'DatasourceManagerService',
    'OtusRestResourceService',
    '$mdToast'
  ];

  function Controller(DatasourceManagerService, OtusRestResourceService, $mdToast) {
    var self = this;

    self.ready = false;
    self.error = false;
    self.delimiter = ';';
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
      formdata.append('file',file);
      formdata.append('delimiter',self.delimiter);

      if (!file.type.match('csv')) {
        _messages('Arquivo incompatível, o formato do arquivo deve csv.');
      } else if(self.identification){
        self.identification = false;

        formdata.append('id',self.id);
        formdata.append('name',self.name);

        DatasourceManagerService.updateDatasource(formdata)
          .then(function (datasource) {
            console.log(datasource);
            if(datasource.data){
              _messages("Dados salvo com sucesso.");
            } else if(datasource.MESSAGE.includes('same')){
              _messages("Fonte de dados já existente, você tem a opção de editar caso desejar.");
            } else if(datasource.MESSAGE.includes('missing')){
              _messages("Não foi possível atualizar a fonte de dados. Há elementos ausentes em comparação ao arquivo anterior.");
            }
            // self.datasources.push(datasource);
            // _getDatasourceList();
          })
          .catch(function (err) {
            _messages("Não foi possível salvar o dado: " + err);
          });
      }else {
        self.createFile = file.name.replace(".csv","");
        console.log(self.createFile);
        formdata.append('id',self.createFile);
        formdata.append('name',self.createFile.toUpperCase());

        console.log(self.createFile.toUpperCase());

        DatasourceManagerService.createDatasource(formdata)
          .then(function (datasource) {
            if(datasource.data){
              _messages("Dados salvo com sucesso.");
            } else if(datasource.MESSAGE.includes('same')){
              _messages("Fonte de dados já existente, você tem a opção de editar caso desejar.");
            } else if(datasource.MESSAGE.includes('missing')){
              _messages("Não foi possível atualizar a fonte de dados. Há elementos ausentes em comparação ao arquivo anterior.");
            }
            _getDatasourceList();
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
