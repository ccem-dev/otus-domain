(function () {
  'use strict';

  angular
    .module('otusDomain.project')
    .component('monitoringPermission', {
      templateUrl: 'app/project/otus-permission/monitoring/monitoring-permission-template.html',
      controller: 'monitoringPermissionController as $ctrl',
    })
    .controller('monitoringPermissionController', Controller);

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
    self.activeAll = activeAll;

    self.active = false

    self.permission = {}
    self.permissionGroup = {}

    function _fetchPermission() {
      try {
        self.permission = ProjectPermissionService.getPermissionByType(PERMISSION_LIST.MONITORING);
        self.permissionGroup = {...self.permission}
        isActive()
      } catch (e) {
        self.error = true;
        throw "Erro ao recuperar informações de " + PERMISSION_LIST.MONITORING ;
      }
    }
    
    function save() {
      if(!isEqual(self.permission, self.permissionGroup)){
       return _showToast("sem alterações nas permissões")
      }
      self.permission = {...self.permissionGroup}
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
      return (self.permission.centerActivitiesAccess != self.permissionGroup.centerActivitiesAccess) ||
      (self.permission.activityFlagsAccess !== self.permissionGroup.activityFlagsAccess) ||
      (self.permission.laboratoryFlagsAccess !== self.permissionGroup.laboratoryFlagsAccess) ||
      (self.permission.laboratoryControlAccess !== self.permissionGroup.laboratoryControlAccess) ||
      (self.permission.pendencyVisualizerAccess !== self.permissionGroup.pendencyVisualizerAccess)

    }

    function isActive(){
      return (self.permission.centerActivitiesAccess) ||
          (self.permission.activityFlagsAccess) ||
          (self.permission.laboratoryFlagsAccess) ||
          (self.permission.laboratoryControlAccess) ||
          (self.permission.pendencyVisualizerAccess)? self.active = true : self.active = false
    }
    function activeAll(){
      if(self.active){
        self.permissionGroup.centerActivitiesAccess = true
        self.permissionGroup.activityFlagsAccess = true
        self.permissionGroup.laboratoryFlagsAccess = true
        self.permissionGroup.laboratoryControlAccess = true
        self.permissionGroup.pendencyVisualizerAccess = true
        return;
      }
      self.permissionGroup.centerActivitiesAccess = false
      self.permissionGroup.activityFlagsAccess = false
      self.permissionGroup.laboratoryFlagsAccess = false
      self.permissionGroup.laboratoryControlAccess = false
      self.permissionGroup.pendencyVisualizerAccess = true
    }

    return self;
  }
})();