(function () {
  'use strict';

  angular
    .module('otusDomain')
    .service('DatasourceRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.update = update;
    self.getById = getById;
    self.list = list;

    function initialize() {
      _rest = OtusRestResourceService.getDatasourceResourceFactory();
    }

    function list() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.list().$promise
    }

    function update(data) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.update(data).$promise;
    }

    function getById(id) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.getById({id: id}).$promise
    }
  }
}());
