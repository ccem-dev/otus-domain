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
    self.isEqual = isEqual;
    self.activeAll = activeAll

    self.active = false
    self.equal = false

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
      ProjectPermissionService.savePermission(self.permission)
        .then(function (response) {
          _showToast("Permissão de atividades salva com sucesso.");
        })
        .catch(function () {
          _showToast("Não foi possível salvar permissão de atividades.");
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

    function isEqual(){
      return (self.permission.participantActivityAccess !== self.permissionGroup.participantActivityAccess) ||
             (self.permission.offlineActivitySincAccess !== self.permissionGroup.offlineActivitySincAccess)
              ? self.equal = true : self.equal = false
    }

    function isActive() {
      return (self.permission.participantActivityAccess) ||
      (self.permission.offlineActivitySincAccess) ? self.active = true : self.active = false
    }

    function activeAll() {
      if (self.active) {
        self.permission.participantActivityAccess = true
        self.permission.offlineActivitySincAccess = true
        return self.equal = true ;
      }
      self.permission.participantActivityAccess = false
      self.permission.offlineActivitySincAccess = false
      self.equal = false;
    }

  }
})();