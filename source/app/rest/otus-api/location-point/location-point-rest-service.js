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
      return _callRestResource(_rest.getConfiguration);
    }

    function saveLocationPoint(data) {
      return _callRestResource(_rest.createLocationPoint, {locationName: data.name});
    }

    function updateLocationPoint(data) {
      return _callRestResource(_rest.updateLocationPoint, data);
    }

    function deleteLocationPoint(locationPointId) {
      return _callRestResource(_rest.deleteLocationPoint, {locationPointId});
    }

    function saveUserLocation(locationPointId, user) {
      return _callRestResource(_rest.saveUserLocation, {locationPointId}, user);
    }

    function removeUserLocation(locationPointId, user) {
      return _callRestResource(_rest.removeUserLocation, {locationPointId}, user);
    }

    function _callRestResource(callback, params, body){
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return callback(params, body).$promise;
    }

  }
}());
