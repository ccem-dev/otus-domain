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
    const DELIMITER = ';';
    var self = this;

    self.ready = false;
    self.isUpdate = false;
    self.datasources = [];
    self.action = {
      'callback': action,
      'type': '.csv'
    };

    self.$onInit = onInit;
    self.exportDatasource = exportDatasource;
    self.updateAction = updateAction;

    function onInit() {
      _getDatasourceList();
    }

    function _getDatasourceList() {
      DatasourceManagerService.getDatasourceList()
        .then(function (datasourceList) {
          self.ready = true;
          self.datasources = datasourceList;
          if (self.datasources.length === 0) {
            _messages('Nenhuma fonte de dados adicionado.');
          }
        }).catch(function (err) {
          _messages('Ocorreu um erro. Tente novamente mais tarde.');
        });
    }

    function action(file) {
      if (!file.type.match('csv')) {
        _messages('Arquivo incompatível, o formato do arquivo deve csv.');
      } else if (self.isUpdate) {
        _update(file);
      } else {
        _create(file);
      }
    }

    function _update(file) {
      self.isUpdate = false;
      var formdata = new FormData();
      formdata.append('file', file);
      formdata.append('delimiter', DELIMITER);
      formdata.append('id', self.id);
      formdata.append('name', self.name);

      DatasourceManagerService.updateDatasource(formdata)
        .then(function (datasource) {
          if (datasource.data) {
            _messages("Dados salvo com sucesso.");
          } else if (datasource.MESSAGE.includes('same')) {
            _messages("Fonte de dados já existente, você tem a opção de editar caso desejar.");
          } else if (datasource.MESSAGE.includes('missing')) {
            _messages("Não foi possível atualizar a fonte de dados. Há elementos ausentes em comparação ao arquivo anterior.");
          }
          _getDatasourceList();
        }).catch(function (err) {
          _messages("Não foi possível salvar o dado: " + err);
        });
    }

    function _create(file) {
      var formdata = new FormData();
      self.createFile = file.name.replace(".csv", "");

      formdata.append('file', file);
      formdata.append('delimiter', DELIMITER);
      formdata.append('id', self.createFile);
      formdata.append('name', self.createFile.toUpperCase());

      DatasourceManagerService.createDatasource(formdata)
        .then(function (datasource) {
          console.log(datasource);
          if (datasource.data) {
            _messages("Dados salvo com sucesso.");
          } else if (datasource.MESSAGE) {
            _messages("Fonte de dados já existente.");
          }
          _getDatasourceList();
        }).catch(function (err) {
          _messages("Não foi possível salvar o dado: " + err);
        });
    }

    function updateAction(datasource) {
      self.id = datasource.id;
      self.name = datasource.name;
      self.isUpdate = true;
    }

    function exportDatasource(datasource) {
      var name = datasource.name + '_'.concat(new Date().toLocaleDateString());
      alasql('SELECT * INTO CSV("' + name + '.csv",{headers:false}) FROM ?', [datasource.data]);
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
