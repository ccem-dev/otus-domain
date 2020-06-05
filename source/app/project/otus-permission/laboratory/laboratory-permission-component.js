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
                console.info("lab: ", self.permissionGroup)
                isActive();
            } catch (e) {
                self.error = true;
                throw "Erro ao recuperar informações de " + PERMISSION_LIST.LABORATORY;
            }
        }

        function save() {
            if(!isEqual(self.permission, self.permissionGroup))
                return _showToast("sem alterações nas permissões")
            ProjectPermissionService.savePermission(self.permission)
                .then(function (response) {
                    _showToast("Permissão de Laboratório salva com sucesso.");
                })
                .catch(function () {
                    _showToast("Não foi possível salvar permissão de Laboratório.");
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
                (permission.unattachedLaboratoriesAccess !== permissionGroup.unattachedLaboratoriesAccess) ||
                (permission.participantLaboratoryAccess !== permissionGroup.participantLaboratoryAccess)
        }

        function isActive() {
            return (self.permission.sampleTransportationAccess) ||
                (self.permission.examLotsAccess) ||
                (self.permission.examSendingAccess) ||
                (self.permission.unattachedLaboratoriesAccess) ||
                (self.permission.participantLaboratoryAccess) ? self.active = true : self.active = false
        }

        function activeAll(){
          if(self.active) {
              self.permission.sampleTransportationAccess = true
              self.permission.examLotsAccess = true
              self.permission.examSendingAccess = true
              self.permission.unattachedLaboratoriesAccess = true
              self.permission.participantLaboratoryAccess = true
              return;
          }
          self.permission.sampleTransportationAccess = false
          self.permission.examLotsAccess = false
          self.permission.examSendingAccess = false
          self.permission.unattachedLaboratoriesAccess = false
          self.permission.participantLaboratoryAccess = false

        }

        return self;
    }
})();