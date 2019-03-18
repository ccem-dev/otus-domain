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
      _rest = OtusRestResourceService.getSurveyGroupResource();
    }

    function getAll() {
      var defer = $q.defer();
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      //Todo: implementar
      defer.resolve({data:[
        {
          objectType: "SurveyGroupPermission",
          email: "tiago.matana@gmail.com",
          groups: ["otus"]
        }
      ]});
      // _rest.getListOfSurveyGroups(function (response) {
      //   if ('data' in response) {
      //     defer.resolve(response.data);
      //   } else {
      //     defer.reject(true);
      //   }
      // });
      return defer.promise;
    }


    function savePermission(data) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.savePermission(data).$promise;
    }

  }
}());
