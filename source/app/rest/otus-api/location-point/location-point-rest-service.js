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

    function deleteLocationPoint(id) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.deleteLocationPoint(id).$promise;
    }

    function saveUserLocation(locationId, user) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.saveUserLocation({location: locationId}, user).$promise;
    }

    function removeUserLocation(locationId, userEmail) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.removeUserLocation({location: locationId},{email: userEmail}).$promise;
    }

  }
}());
