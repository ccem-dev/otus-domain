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
    self.addNewSurveyGroup = addNewSurveyGroup;
    self.updateSurveyGroupName = updateSurveyGroupName;
    self.updateSurveyGroupAcronyms = updateSurveyGroupAcronyms;
    self.deleteSurveyGroup = deleteSurveyGroup;

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

    function addNewSurveyGroup(group) {
      var defer = $q.defer();
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      _rest.addNewSurveyGroup(group, function () {
        defer.resolve();
      });
      return defer.promise;
    }

    function updateSurveyGroupName(update) {
      var defer = $q.defer();
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      _rest.updateSurveyGroupName(update, function () {
        defer.resolve();
      });
      return defer.promise;
    }

    function updateSurveyGroupAcronyms(group) {
      var defer = $q.defer();
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      _rest.updateSurveyGroupAcronyms(group, function () {
        defer.resolve();
      });
      return defer.promise;
    }

    function deleteSurveyGroup(name) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.deleteSurveyGroup({ name: name }).$promise;
    }

  }
}());
