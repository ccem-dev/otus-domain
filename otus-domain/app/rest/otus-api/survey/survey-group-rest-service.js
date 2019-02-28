(function () {
  'use strict';

  angular
    .module('otusDomain')
    .service('SurveyGroupRestService', Service);

  Service.$inject = [
    '$q',
    'OtusRestResourceService'
  ];

  function Service($q, OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.getListOfSurveyGroups = getListOfSurveyGroups;
    self.addNewGroup = addNewGroup;
    self.editGroup = editGroup;
    self.deleteGroup = deleteGroup;

    function initialize() {
      _rest = OtusRestResourceService.getSurveyGroupResource();
    }

    function getListOfSurveyGroups() {
      var defer = $q.defer();
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      _rest.getListOfSurveyGroups(function (response) {
        if ('data' in response) {
          defer.resolve(response.data);
        } else {
          defer.reject(true);
        }
      });
      return defer.promise;
    }

    function addNewGroup(group) {
      var defer = $q.defer();
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      _rest.addNewGroup(group, function () {
        defer.resolve();
      });
      return defer.promise;
    }

    function editGroup(group) {
      var defer = $q.defer();
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      _rest.editGroup(group, function () {
        defer.resolve();
      });
      return defer.promise;
    }

    function deleteGroup(group) {
      var defer = $q.defer();
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      _rest.deleteGroup(group, function () {
        defer.resolve();
      });
      return defer.promise;
    }

  }
}());
