(function () {
  'use strict';

  angular
    .module('otusDomain.rest')
    .service('LocationPointRestService', Service);

  Service.$inject = [
    '$q',
    'OtusRestResourceService'
  ];

  function Service($q, OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.getConfiguration = getConfiguration;
    self.saveLocationPoint = saveLocationPoint;
    self.updateLocationPoint = updateLocationPoint;
    self.deleteLocationPoint = deleteLocationPoint;
    self.saveUserLocation = saveUserLocation;
    self.removeUserLocation = removeUserLocation;

    function initialize() {
      _rest = OtusRestResourceService.getLocationPointResource();
    }

    function getConfiguration() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.getConfiguration().$promise;
    }

    function saveLocationPoint(data) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.createLocationPoint({locationName: data.name}).$promise;
    }

    function updateLocationPoint(data) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.updateLocationPoint(data).$promise;
    }

    function deleteLocationPoint(locationPointId) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.deleteLocationPoint({locationPointId}).$promise;
    }

    function saveUserLocation(locationPointId, user) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.saveUserLocation({locationPointId}, user).$promise;
    }

    function removeUserLocation(locationPointId, user) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.removeUserLocation({locationPointId}, user).$promise;
    }

  }
}());
