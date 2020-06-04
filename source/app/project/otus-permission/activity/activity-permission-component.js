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

    self.active = false

    self.permission = true
    self.initialValue = false

    function _fetchPermission() {
      try {
        self.permission = ProjectPermissionService.getPermissionByType(PERMISSION_LIST.PARTICIPANT);
        self.initialValue = self.permission.participantActivityAccess
      } catch (e) {
        self.error = true;
        throw "Erro ao recuperar informações de " + PERMISSION_LIST.PARTICIPANT ;
      }
    }
    
    function save() {
      if(self.initialValue === self.permission.participantActivityAccess){
       return _showToast("sem alterações nas permissões")
      }
      self.permission.participantActivityAccess == self.initialValue
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

  }
})();