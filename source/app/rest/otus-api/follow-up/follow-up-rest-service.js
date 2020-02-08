(function () {
  'use strict';

  angular
    .module('otusDomain.rest')
    .service('FollowUpRestService', FollowUpRestService);

  FollowUpRestService.$inject = [
    'OtusRestResourceService'
  ];

  function FollowUpRestService(OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.update = update;
    self.deactivate = deactivate;
    self.list = list;
    self.add = add;

    function initialize() {
       _rest = OtusRestResourceService.getFollowUpResourceFactory();
    }

    function add(followUp) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.add({}, followUp).$promise;
    }

    function deactivate(id) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.deactivate({id}).$promise;
    }

    function list() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.list().$promise;
    }

    function update(followUp) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.update({}, followUp).$promise;
    }
  }
}());
