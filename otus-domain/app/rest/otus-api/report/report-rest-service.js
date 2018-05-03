(function () {
  'use strict';

  angular
    .module('otusDomain')
    .service('ReportRestService', Service);

  Service.$inject = [
    '$q',
    'OtusRestResourceService'
  ];

  function Service($q, OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.update = update;
    self.getById = getById;
    self.list = list;
    self.create = create;
    self.remove = remove;

    function initialize() {
      _rest = OtusRestResourceService.getReportResourceFactory();
    }

    function create(data) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.create(data).$promise
    }

    function list() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.listAll().$promise
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


    function remove(id) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.remove({id: id}).$promise;
    }
  }
}());
