(function() {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('datasourceManager', {
      controller: 'datasourceManagerController as $ctrl',
      templateUrl: 'app/project/datasource/datasource-manager-template.html'
    })

    .controller('datasourceManagerController', Controller);

  Controller.$inject = [
    'DatasourceManagerService',
    'OtusRestResourceService',
    '$mdToast'
  ];

  function Controller(DatasourceManagerService, OtusRestResourceService, $mdToast) {
    var DELIMITER = ';';
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
        _messages('Arquivo incompatível, o formato do arquivo deve ser csv.');
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
        _messages("Não foi possível salvar o datasource: " + err);
      });
    }

    function _create(file) {
      var formData = new FormData();

      self.createFileName = file.name.replace(/\.csv/gi, "").replace(/ \([0-9]\)/gi, "");

      formData.append('file', file);
      formData.append('delimiter', DELIMITER);
      formData.append('id', self.createFileName.toLowerCase());
      formData.append('name', self.createFileName.toUpperCase());

      DatasourceManagerService.createDatasource(formData)
        .then(function (datasource) {
          if (datasource.data) {
            _messages("Dados salvo com sucesso.");
          } else if (datasource.MESSAGE) {
            if(datasource.MESSAGE.match("duplicated")){
              _messages("Existem elementos duplicados na fonte de dados.");
            } else {
              _messages("Fonte de dados já existente.");
            }
          }
          _getDatasourceList();
        }).catch(function (err) {
        _messages("Não foi possível salvar o datasource: " + err);
      });
    }

    function updateAction(datasource) {
      self.id = datasource.id;
      self.name = datasource.name;
      self.isUpdate = true;
    }

    function exportDatasource(datasource) {
      var name = datasource.name;
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
