(function () {
  'use strict';

  angular
    .module('otusDomain.rest')
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

    function addNewSurveyGroup(data) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.addNewSurveyGroup(data).$promise;
    }

    function updateSurveyGroupName(data) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.updateSurveyGroupName(data).$promise;
    }

    function updateSurveyGroupAcronyms(data) {
      var defer = $q.defer();
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      _rest.updateSurveyGroupAcronyms(data,function (response) {
        if ('data' in response) {
          defer.resolve(response.data);
        } else {
          defer.reject(response);
        }
      });
      return defer.promise;
    }

    function deleteSurveyGroup(data) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.deleteSurveyGroup(data).$promise;
    }

  }
}());
