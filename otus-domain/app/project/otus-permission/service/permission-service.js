(function () {
  'use strict';

  angular
    .module('otusDomain.project')
    .service('ProjectPermissionService', Service);

  Service.$inject = [
    'PermissionRestService',
    'otusjs.user.permission.PermissionManagerFactory',
    'otusjs.user.permission.SurveyGroupPermissionFactory',
    '$q'
  ];

  function Service(PermissionRestService, PermissionManagerFactory, SurveyGroupPermissionFactory, $q) {
    var _permissionManager;
    var self = this;

    /* Public methods */
    self.fetchPermissions = fetchPermissions;
    self.savePermission = savePermission;
    self.getPermissionByType = getPermissionByType;

    function fetchPermissions(email) {
      return PermissionRestService.getAll(email)
        .then(function (response) {
          console.log(response);
          console.log($q.resolve());
          console.log(Promise.resolve());
          try {
            _setPermissionManager(response.data.permissions, email);
          } catch (e) {
            return $q.reject(e);
          }
          return _permissionManager;

        })
    }

    function savePermission(permission) {
      return PermissionRestService.savePermission(permission.toJSON())
        .then(function (response) {
          if ("data" in response) {
            return response.data;
          } else {
            $q.reject();
          }
        })

    }

    function getPermissionByType(objectType) {
      return _permissionManager.findByType(objectType);
    }

    function _setPermissionManager(managerData, email) {
      _permissionManager = PermissionManagerFactory.create(managerData, email);
    }

  }
}());
