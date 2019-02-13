(function() {
  'use strict';

  angular
    .module('otusDomain.project.datasource')
    .component('datasourceManager', {
      controller: 'datasourceManagerController as $ctrl',
      templateUrl: 'app/project/datasource/datasource-manager-template.html'
    })

    .controller('datasourceManagerController', Controller);

  Controller.$inject = [
    'DatasourceManagerService',
    "$mdDialog",
    '$mdToast'
  ];

  function Controller(DatasourceManagerService, $mdDialog, $mdToast) {
    var DELIMITER = ';';
    var self = this;

    self.ready = false;
    self.loadFile = false;
    self.isLoading = isLoading;
    
    function isLoading() {
     return self.loadFile;
    };

    self.initLoadFile = initLoadFile;
    
    function initLoadFile(){
      self.loadFile = !self.loadFile;
    }

    self.isUpdate = false;
    self.datasources = [];
    self.action = {
      'callback': action,
      'type': '.csv',
      'loading' : self.initLoadFile
    };

    self.$onInit = onInit;
    self.exportDatasource = exportDatasource;
    self.saveNewDatasource = saveNewDatasource;
    self.updateAction = updateAction;
    self.newDatasourceAction = newDatasourceAction;
    self.datasourceNameFilter = datasourceNameFilter;

    function onInit() {
      self.newDatasourceName = "";
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
        $("#newDatasourceName").focus();
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
          } else if(datasource.MESSAGE.includes("Data Validation Fail: ID")) {
            var alert = $mdDialog.alert().title("Não foi possível salvar o datasource").content("Entre em contato com o suporte").ok('ok');
            $mdDialog
              .show(alert)
          }
          _getDatasourceList();
        }).catch(function (err) {
          _messages("Não foi possível salvar o datasource: " + err);
      });
    }

    function _create(file) {
      self.newDatasourceFile = file;
    }
    
    function datasourceNameFilter(e) {
      var keyCode = event.keyCode;
      var smallLetters = (keyCode >= 97 && keyCode <= 122);
      var capitalLetters = (keyCode >= 65 && keyCode <= 90);
      var numbers = (keyCode >= 48 && keyCode <= 57);
      var underLine = (keyCode === 95);

      if (!(smallLetters || capitalLetters || numbers || underLine)){
        e.preventDefault();
      }
    }

    function newDatasourceAction() {
      self.insertingNewDatasource = true;

    }
    self.cancelUpload = cancelUpload;
    function cancelUpload() {
      delete self.newDatasourceFile;
      delete self.insertingNewDatasource;
    }

    function saveNewDatasource(){
      var formData = new FormData();

      self.createFileName = self.newDatasourceName.replace(/\.csv/gi, "").replace(/ \([0-9]\)/gi, "");

      formData.append('file', self.newDatasourceFile);
      formData.append('delimiter', DELIMITER);
      formData.append('id', self.createFileName.toLowerCase());
      formData.append('name', self.createFileName.toUpperCase());

      DatasourceManagerService.createDatasource(formData)
        .then(function (datasource) {
          if (datasource.data) {
            _messages("Dados salvo com sucesso.");
          } else if (datasource.MESSAGE) {
            if(datasource.MESSAGE.match("duplicated")){
              var alertContent = "";
              datasource.CONTENT.forEach(function(element){
                if(element.match("extraction")){
                  var  extractionValue = element.split(":");
                  alertContent = alertContent.concat("Valor de extração: "+extractionValue[1].concat(" <br> "));
                }
                if(element.match("value")){
                  var  value = element.split(":");
                  alertContent = alertContent.concat("Valor: "+value[1].concat(" <br> "));
                }
              });
              var alert = $mdDialog.alert().title("Existem elementos duplicados na fonte de dados: ").htmlContent(alertContent).ok('ok');
              $mdDialog
                .show(alert)
                .then(function () {
                })
            } else {
              _messages("Fonte de dados já existente.");
            }
          }
          _exitNewDatasourceState();
          _getDatasourceList();
        }).catch(function (err) {
        _messages("Não foi possível salvar o datasource: " + err);
        _exitNewDatasourceState();
      });
    }

    function _exitNewDatasourceState(){
      self.newDatasourceFile = null;
      self.insertingNewDatasource = false;
      self.newDatasourceName = "";
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
