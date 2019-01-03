(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .factory('DatasourceFactory', factory);

  function factory() {
    var self = this;

    self.create = create;


    function create(datasourceData) {
      return new Datasource(datasourceData);
    }

    return self;
  }

  function Datasource(datasourceData) {
    var self = this;

    var basicDatasourceSchema = Object.freeze({
      id: undefined,
      name: undefined,
      data: undefined
    });

    onInit(datasourceData);

    function onInit(datasourceData) {
      Object.assign(self, basicDatasourceSchema, datasourceData);
    }

    return self;
  }
}());
