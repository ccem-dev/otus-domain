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
    'PERMISSION_LIST',
    'ProjectPermissionService'
  ];

  function Controller(PERMISSION_LIST, ProjectPermissionService) {
    var self = this;

    self.initialValue = undefined;
    self.save = save;

    self.$onInit =  function () {
      _fetchPermission();
    };

    function _fetchPermission() {
      self.permission = ProjectPermissionService.getPermissionByType(PERMISSION_LIST.LABORATORY);
      self.initialValue = self.permission.access;
    }
    
    function save() {
      ProjectPermissionService.savePermission(self.permission)
        .then(function (response) {
          _showToast("Permissão de Grupo salva com sucesso.")
          self.initialValue = self.permission.access;
        })
        .catch(function () {
          _showToast("Não foi possível salvar permissão.")
          self.permission.access = self.initialValue;
        });
    }

    return self;
  }
})();