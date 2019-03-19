(function () {
  'use strict';

  angular
    .module('otusDomain.rest')
    .service('PermissionRestService', Service);

  Service.$inject = [
    '$q',
    'OtusRestResourceService'
  ];

  function Service($q, OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.getAll = getAll;
    self.savePermission = savePermission;

    function initialize() {
      _rest = OtusRestResourceService.getUserPermissionResource();
    }

    function getAll(email) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.getAll({email: email}).$promise;
      // return _rest.getAll().$promise;
    }

    function savePermission(data) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.savePermission(data).$promise;
    }

  }
}());
