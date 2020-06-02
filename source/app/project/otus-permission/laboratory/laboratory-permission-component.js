(function () {
  'use strict';

  angular
    .module('otusDomain.project')
    .component('laboratoryPermission', {
      templateUrl: 'app/project/otus-permission/laboratory/laboratory-permission-template.html',
      controller: 'laboratoryPermissionController as $ctrl',
    })
    .controller('laboratoryPermissionController', Controller);

  Controller.$inject = [
    '$mdToast',
    'PERMISSION_LIST',
    'ProjectPermissionService'
  ];

  function Controller($mdToast, PERMISSION_LIST, ProjectPermissionService) {
    var self = this;

    self.initialValue = undefined;
    self.error = false;

    self.$onInit =  _fetchPermission;
    self.save = save;

    self.laboratoryActive = false
    self.Monitoring = false
    self.participant = false
    self.participantActivity = false

    function _fetchPermission() {
      try {
        self.permission = ProjectPermissionService.getPermissionByType(PERMISSION_LIST.LABORATORY );
        self.initialValue = self.permission.access;
      } catch (e) {
        self.error = true;
        throw "Erro ao recuperar informações de " + PERMISSION_LIST.LABORATORY ;
      }
    }
    
    function save() {
      ProjectPermissionService.savePermission(self.permission)
        .then(function (response) {
          _showToast("Permissão de Grupo salva com sucesso.");
          self.initialValue = self.permission.access;
        })
        .catch(function () {
          _showToast("Não foi possível salvar permissão.");
          self.permission.access = self.initialValue;
        });
    }

    function _showToast(message) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(message)
          .position("bottom right")
          .hideDelay(3000)
      );
    }

    return self;
  }
})();