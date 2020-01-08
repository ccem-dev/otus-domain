(function () {
  'use strict';

  angular
    .module('otusDomain.rest')
    .service('OutcomeRestService', OutcomeRestService);

  OutcomeRestService.$inject = [
    'OtusRestResourceService'
  ];

  function OutcomeRestService(OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.update = update;
    self.list = list;
    self.create = create;

    function initialize() {
      _rest = OtusRestResourceService.getOutcomeResourceFactory();
    }

    function create(data) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.create(data).$promise;
    }

    function list() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.list().$promise;
    }

    function update(data) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.update(data).$promise;
    }
  }
}());
