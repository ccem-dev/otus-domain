(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .factory('DatasourceFactory', factory);

  function factory() {
    var self = this;

    self.create = create;
    self.fromCSVFile = fromCSVFile;

    function create(datasourceData) {
      return new Datasource(datasourceData);
    }

    function fromCSVFile(file) {
      try {
        return new extractDatasource(file);
      } catch (err) {
        throw 'Erro ao processar arquivo';
      }
    }

    return self;
  }

  function extractDatasource(file) {

    function getDatasourceData(text) {
      var datasource = JSON.parse(text);
      return datasource;
    }

    return getDatasourceData(file);
  }

  function Datasource(datasourceData) {
    var self = this;
    var _datasourceData = datasourceData;

    var basicDatasourceSchema = Object.freeze({
      id: undefined,
      name: undefined,
      data: undefined
    });

    onInit(datasourceData);

    self.getId = getId;
    self.refresh = refresh;
    self.reload = reload;
    self.toJSON = toJSON;


    function onInit(datasourceData) {
      Object.assign(self, basicDatasourceSchema, datasourceData);
    }

    function refresh(data) {
      _datasourceData = data;
      angular.extend(self, data);
    }

    function reload() {
      angular.extend(self, _datasourceData);
    }

    function toJSON() {
      var json = {};

      Object.keys(_datasourceData).forEach(function (key) {
        json[key] = self[key];
      });

      json.sendingDate = self.sendingDate ? self.sendingDate : new Date();

      return json;
    }

    function getId() {
      return self._id.$oid;
    }

    return self;
  }
}());
