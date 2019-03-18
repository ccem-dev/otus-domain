(function () {
  'use strict';

  angular
    .module('otusDomain.project')
    .service('ProjectPermissionService', Service);

  Service.$inject = [
    'PermissionRestService',
    'otusjs.user.permission.PermissionManagerFactory',
    '$q'
  ];

  function Service(PermissionRestService, PermissionManagerFactory, $q) {
    var permissionManagerFactory;
    var self = this;

    /* Public methods */
    // self.getListOfSurveyGroups = getListOfSurveyGroups;
    // self.addNewSurveyGroup = addNewSurveyGroup;
    // self.updateSurveyGroupName = updateSurveyGroupName;
    // self.updateSurveyGroupAcronyms = updateSurveyGroupAcronyms;
    // self.deleteSurveyGroup = deleteSurveyGroup;

    self.getAll = getAll;
    // self.getPermissionComponent = getPermissionComponent;
    self.savePermission = savePermission;

    function getAll(email) {
      return PermissionRestService.getAll(email).then(function (response) {
        if (response.data){
          permissionManagerFactory = PermissionManagerFactory.create(response.data);
          console.log(permissionManagerFactory)
          return permissionManagerFactory;
        }
        return [];

      });
    }
    //
    // function getPermissionComponent(objectType) {
    //   return PERMISSION_LIST[objectType];
    // }




    // function getListOfSurveyGroups() {
    //   return SurveyGroupRestService.getListOfSurveyGroups()
    //     .then(function (response) {
    //       groupManagerFactory = GroupManagerFactory.create(response);
    //       return groupManagerFactory;
    //     }).catch(function (e) {
    //       return $q.reject(e);
    //     });
    // }
    //
    function savePermission(permission) {
      try {
        return PermissionRestService.savePermission(permission)
          .then(function (response) {
            return response;
          }).catch(function (e) {
            return $q.reject(e);
          });
      } catch (e) {
        return $q.reject(e);
      }
    }
    //
    // function updateSurveyGroupName(oldName, newName) {
    //   var update = {
    //     surveyGroupName: oldName,
    //     newSurveyGroupName: newName
    //   };
    //   return SurveyGroupRestService.updateSurveyGroupName(update)
    //     .then(function (response) {
    //       return response;
    //     }).catch(function (e) {
    //       return $q.reject(e);
    //     });
    // }
    //
    // function deleteSurveyGroup(name) {
    //   var deleteGroup = {
    //     surveyGroupName: name,
    //     newSurveyGroupName: ''
    //   };
    //   return SurveyGroupRestService.deleteSurveyGroup(deleteGroup)
    //     .then(function (response) {
    //       return response;
    //     }).catch(function (e) {
    //       return $q.reject(e);
    //     });
    // }
    //
    // function updateSurveyGroupAcronyms(group) {
    //   return SurveyGroupRestService.updateSurveyGroupAcronyms(group)
    //     .then(function (response) {
    //       return response;
    //     }).catch(function (e) {
    //       return $q.reject(e);
    //     });
    // }
    //
    // function getAllUsers() {
    //
    // }
  }
}());
