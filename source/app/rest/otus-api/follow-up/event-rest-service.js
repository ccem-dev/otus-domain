(function () {
  'use strict';

  angular
    .module('otusDomain.rest')
    .service('EventRestService', EventRestService);

  EventRestService.$inject = [
    'OtusRestResourceService'
  ];

  function EventRestService(OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.deactivate = deactivate;
    self.create = create;

    function initialize() {
      _rest = OtusRestResourceService.getEventResourceFactory();
    }

    function create(id, followUpEvent) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.create({id}, followUpEvent).$promise;
    }

    function deactivate(id) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.deactivate({id}).$promise;
    }
  }
}());
