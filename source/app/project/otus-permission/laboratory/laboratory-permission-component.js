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

        self.error = false;

        self.$onInit = _fetchPermission;
        self.save = save;
        self.activeAll = activeAll;

        self.active = false

        self.permission = {}
        self.permissionGroup = {}

        function _fetchPermission() {
            try {
                self.permission = ProjectPermissionService.getPermissionByType(PERMISSION_LIST.LABORATORY);
                self.permissionGroup = {...self.permission}
                isActive();
            } catch (e) {
                self.error = true;
                throw "Erro ao recuperar informações de " + PERMISSION_LIST.LABORATORY;
            }
        }

        function save() {
            if(!isEqual(self.permission, self.permissionGroup))
                return _showToast("sem alterações nas permissões")

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

        function isEqual(permission, permissionGroup) {
            return (permission.sampleTransportationAccess != permissionGroup.sampleTransportationAccess) ||
                (permission.examLotsAccess !== permissionGroup.examLotsAccess) ||
                (permission.examSendingAccess !== permissionGroup.examSendingAccess) ||
                (permission.unattachedLaboratoriesAccess !== permissionGroup.unattachedLaboratoriesAccess)
        }

        function isActive() {
            return (self.permission.sampleTransportationAccess) ||
                (self.permission.examLotsAccess) ||
                (self.permission.examSendingAccess) ||
                (self.permission.unattachedLaboratoriesAccess) ? self.active = true : self.active = false
        }

        function activeAll(){
          if(self.active) {
              self.permissionGroup.sampleTransportationAccess = true
              self.permissionGroup.examLotsAccess = true
              self.permissionGroup.examSendingAccess = true
              self.permissionGroup.unattachedLaboratoriesAccess = true
              return;
          }
          self.permissionGroup.sampleTransportationAccess = false
          self.permissionGroup.examLotsAccess = false
          self.permissionGroup.examSendingAccess = false
          self.permissionGroup.unattachedLaboratoriesAccess = false

        }

        return self;
    }
})();