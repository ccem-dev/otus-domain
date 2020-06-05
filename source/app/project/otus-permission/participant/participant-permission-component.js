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
    self.isEqual = isEqual;
    self.activeAll = activeAll;

    self.active = false
    self.equal = true

    self.permission = {}
    self.permissionGroup = {}

    function _fetchPermission() {
      try {
        self.permission = ProjectPermissionService.getPermissionByType(PERMISSION_LIST.PARTICIPANT);
        self.permissionGroup = {...self.permission}
        isActive()
      } catch (e) {
        self.error = true;
        throw "Erro ao recuperar informações de " + PERMISSION_LIST.PARTICIPANT ;
      }
    }
    
    function save() {

      ProjectPermissionService.savePermission(self.permission)
        .then(function (response) {
          self.equal = true
          self.permissionGroup = {...self.permission}
          _showToast("Permissão de Participante salva com sucesso.");
        })
        .catch(function () {
          _showToast("Não foi possível salvar permissão de Participante.");
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
          ? self.equal = false : self.equal = true
    }

    function isActive(){
      return(self.permission.participantListAccess) ||
      (self.permission.participantCreateAccess) ||
      (self.permission.anonymousParticipantAccess) ? self.active = true : self.active = false
    }

    function activeAll(){
      if(self.active){
        self.permission.participantListAccess = true
        self.permission.participantCreateAccess = true
        self.permission.anonymousParticipantAccess = true
        return isEqual();
      }
      self.permission.participantListAccess = false
      self.permission.participantCreateAccess = false
      self.permission.anonymousParticipantAccess = false
      isEqual();
    }

    return self;
  }
})();