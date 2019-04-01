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
    var _permissionManagerFactory;
    var self = this;

    /* Public methods */
    self.getAll = getAll;
    self.savePermission = savePermission;

    function getAll(email) {
      return PermissionRestService.getAll(email).then(function (response) {
        if ('data' in response){
          _permissionManagerFactory = PermissionManagerFactory.create(response.data.permissions, email);
          if (!_permissionManagerFactory.permissionList.length){
            return _buildEmptyPermissions(email);
          }
          return _permissionManagerFactory;
        }
        return $q.reject()
      }).catch(function () {
        return $q.reject();
      });
    }

    function savePermission(permission) {
      try {
        return PermissionRestService.savePermission(permission.toJSON())
          .then(function (response) {
            return response;
          }).catch(function (e) {
            return $q.reject(e);
          });
      } catch (e) {
        return $q.reject(e);
      }
    }

    function _buildEmptyPermissions(email) {
      let _permissions = [];
      _permissions.push(SurveyGroupPermissionFactory.create({}, email));
      _permissionManagerFactory = PermissionManagerFactory.create(_permissions, email);
      return _permissionManagerFactory;
    }
  }
}());
