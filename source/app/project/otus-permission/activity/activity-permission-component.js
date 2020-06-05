(function () {
  'use strict';

  angular
    .module('otusDomain.project')
    .component('activityPermission', {
      templateUrl: 'app/project/otus-permission/activity/activity-permission-template.html',
      controller: 'activityPermissionController as $ctrl',
    })
    .controller('activityPermissionController', Controller);

  Controller.$inject = [
    '$mdToast',
    'PERMISSION_LIST',
    'ProjectPermissionService'
  ];

  function Controller($mdToast, PERMISSION_LIST, ProjectPermissionService) {
    var self = this;

    self.error = false;

    self.$onInit =  _fetchPermission;
    self.save = save;
    self.activeAll = activeAll

    self.active = false

    self.permission = {}
    self.permissionGroup = {}

    function _fetchPermission() {
      try {
        self.permission = ProjectPermissionService.getPermissionByType(PERMISSION_LIST.ACTIVITY);
        self.permissionGroup = {...self.permission}
        console.info(self.permissionGroup)
        isActive();
      } catch (e) {
        self.error = true;
        throw "Erro ao recuperar informações de " + PERMISSION_LIST.PARTICIPANT ;
      }
    }
    
    function save() {
      if(!isEqual(self.permission, self.permissionGroup)){
       return _showToast("sem alterações nas permissões")
      }
      ProjectPermissionService.savePermission(self.permission)
        .then(function (response) {
          console.info(self.permission.participantActivityAccess)
          _showToast("Permissão de Grupo salva com sucesso.");
        })
        .catch(function () {
          _showToast("Não foi possível salvar permissão.");
        })
    }

    function _showToast(message) {
      $mdToast.show(
          $mdToast.simple()
              .textContent(message)
              .position("bottom right")
              .hideDelay(3000)
      );
    }

    function isEqual(permission, permissionGroup){
      return (permission.participantActivityAccess !== permissionGroup.participantActivityAccess) ||
             (permission.offlineActivitySincAccess !== permissionGroup.offlineActivitySincAccess)
    }

    function isActive() {
      return (self.permission.participantActivityAccess) ||
      (self.permission.offlineActivitySincAccess) ? self.active = true : self.active = false
    }

    function activeAll() {
      if (self.active) {
        self.permissionGroup.participantActivityAccess = true
        self.permissionGroup.offlineActivitySincAccess = true
        return;
      }
      self.permissionGroup.participantActivityAccess = false
      self.permissionGroup.offlineActivitySincAccess = false
    }

  }
})();