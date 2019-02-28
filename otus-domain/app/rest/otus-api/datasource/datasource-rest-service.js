(function () {
  'use strict';

  angular
    .module('otusDomain.rest')
    .service('DatasourceRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.create = create;
    self.update = update;
    self.list = list;
    self.getById = getById;

    function initialize() {
      _rest = OtusRestResourceService.getDatasourceResourceFactory();
    }

    function create(data) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      };
      return _rest.create(data);
    };

    function update(data) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      };
      return _rest.update(data);
    };

    function list() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      };
      return _rest.list();
    };

    function getById(id) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      };
      return _rest.getById(id);
    };
  }
}());
