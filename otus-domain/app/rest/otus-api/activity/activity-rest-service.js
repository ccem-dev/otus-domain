(function () {
  'use strict';

  angular
    .module('otusDomain')
    .service('ActivityRestService', Service);

  Service.$inject = [
    '$q',
    'OtusRestResourceService'
  ];

  function Service($q, OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
     self.getById = getById;

    function initialize() {
      _rest = OtusRestResourceService.getActivityResource();
    }

    function getById(acronym) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.getById({ id: acronym }).$promise
    }

  }
}());
