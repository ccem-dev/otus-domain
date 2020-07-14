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
        self.isEqual = isEqual
        self.activeAll = activeAll;
        self.isActive = isActive;

        self.active = false
        self.equal = true

        self.permission = {}
        self.permissionGroup = {}

        function _fetchPermission() {
            try {
                self.permission = ProjectPermissionService.getPermissionByType(PERMISSION_LIST.LABORATORY);
                self.permissionGroup = angular.copy(self.permission)

                self.isActive();
            } catch (e) {
                self.error = true;
                throw "Erro ao recuperar informações de " + PERMISSION_LIST.LABORATORY;
            }
        }

        function save() {
            ProjectPermissionService.savePermission(self.permission)
                .then(function (response) {
                    self.equal = true
                    self.permissionGroup = angular.copy(self.permission)
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

        function isEqual() {
            return (self.permission.sampleTransportationAccess != self.permissionGroup.sampleTransportationAccess) ||
                (self.permission.examLotsAccess !== self.permissionGroup.examLotsAccess) ||
                (self.permission.examSendingAccess !== self.permissionGroup.examSendingAccess) ||
                (self.permission.unattachedLaboratoriesAccess !== self.permissionGroup.unattachedLaboratoriesAccess) ||
                (self.permission.participantLaboratoryAccess !== self.permissionGroup.participantLaboratoryAccess)
                ? self.equal = false : self.equal = true

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

              return isEqual();
          }
          self.permission.sampleTransportationAccess = false
          self.permission.examLotsAccess = false
          self.permission.examSendingAccess = false
          self.permission.unattachedLaboratoriesAccess = false
          self.permission.participantLaboratoryAccess = false
          isEqual();
        }

        return self;
    }
})();