(function () {
  'use strict';

  angular
    .module('otusDomain.project')
    .component('participantPermission', {
      templateUrl: 'app/project/otus-permission/participant/participant-permission-template.html',
      controller: 'participantPermissionController as $ctrl',
    })
    .controller('participantPermissionController', Controller);

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

    self.active = false

    self.permission = {}
    self.permissionGroup = {}

    function _fetchPermission() {
      try {
        self.permission = ProjectPermissionService.getPermissionByType(PERMISSION_LIST.PARTICIPANT);
        self.permissionGroup = {...self.permission}
      } catch (e) {
        self.error = true;
        throw "Erro ao recuperar informações de " + PERMISSION_LIST.PARTICIPANT ;
      }
    }
    
    function save() {
      if(isEqual()){
       return _showToast("sem alterações nas permissões")
      }
      ProjectPermissionService.savePermission(self.permissionGroup)
        .then(function (response) {
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
    function isEqual(){
      return (self.permission.participantListAccess != self.permissionGroup.participantListAccess) ||
          (self.permission.participantCreateAccess !== self.permissionGroup.participantCreateAccess) ||
          (self.permission.anonymousParticipantAccess !== self.permissionGroup.anonymousParticipantAccess)
    }

    function isActive(){
      return(self.permission.participantListAccess) ||
      (self.permission.participantCreateAccess) ||
      (self.permission.anonymousParticipantAccess)
    }
    return self;
  }
})();