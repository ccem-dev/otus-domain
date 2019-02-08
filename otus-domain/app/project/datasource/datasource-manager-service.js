(function () {
  'use strict';

  angular
    .module('otusDomain.project.datasource')
    .service('DatasourceManagerService', Service);

  Service.$inject = [
    'DatasourceRestService',
    'DatasourceFactory',
    '$q'
  ];

  function Service(DatasourceRestService, DatasourceFactory, $q) {
    var self = this;

    self.getDatasourceList = getDatasourceList;
    self.updateDatasource = updateDatasource;
    self.createDatasource = createDatasource;


    onInit();

    function onInit() {
      DatasourceRestService.initialize();
    }

    function getDatasourceList() {
      return DatasourceRestService.list()
        .then(function (response) {
          var datasourceList = response.data.data;
          return datasourceList.map(function (datasourceData) {
            return DatasourceFactory.create(datasourceData);
          });
        }).catch(function (e) {
          throw e;
        });
    }

    function updateDatasource(datasource) {
      return DatasourceRestService.update(datasource)
        .then(function (response) {
          if (response.data) {
            return response.data;
          } else {
            return $q.reject(response.MESSAGE);
          }
        }).catch(function (e) {
          return $q.reject(e);
        });
    }

    function createDatasource(datasource) {
      return DatasourceRestService.create(datasource)
        .then(function (response) {
          if (response.data) {
            return response.data;
          } else {
            return $q.reject(response.MESSAGE);
          }
        }).catch(function (e) {
          return $q.reject(e);
        });
    }
  }
}());
