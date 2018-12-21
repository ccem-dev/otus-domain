(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .service('DatasourceManagerService', Service);

  Service.$inject = [
    'DatasourceRestService',
    'DatasourceFactory',
    '$q'
  ];

  function Service(DatasourceRestService, DatasourceFactory, $q) {
    var self = this;

    self.getDatasourceList = getDatasourceList;
    self.uploadDatasources = uploadDatasources;

    onInit();

    function onInit() {
      DatasourceRestService.initialize();
    }

    function getDatasourceList() {
      return DatasourceRestService.list()
        .then(function (response) {
          var datasourceList = response.data;
          return datasourceList.map(function (datasourceData) {
            return DatasourceFactory.create(datasourceData);
          });
        })
        .catch(function (e) {
          throw e;
        });
    }

    function uploadDatasources(file) {
      try {
        var datasource = DatasourceFactory.fromCSVFile(file);
      } catch (err) {
        return $q.reject(err);
      }

      _updateDatasource(datasource);

    }

    function _updateDatasource(datasource) {
      return DatasourceRestService.update(datasource)
        .then(function (response) {
          if (response.data) {
            datasource.refresh(response.data);
            return response.data;
          } else {
            return $q.reject(response.MESSAGE);
          }
        })
        .catch(function (e) {
          return $q.reject(e);
        });
    }
  }
}());
