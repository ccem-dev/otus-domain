(function () {
  'use strict';

  angular
    .module('otusDomain.project')
    .component('permissionGridComponent', {
      templateUrl: 'app/project/otus-permission/permission-grid/permission-grid-template.html',
      controller: 'permissionGridController as $ctrl',
      bindings: {
        userEmail: "=",
      }
    })
    .controller('permissionGridController', Controller);

  Controller.$inject = [
    '$mdDialog',
    'ProjectPermissionService'
  ];

  function Controller($mdDialog, ProjectPermissionService) {
    var self = this;
    self.$onInit = _getAllPermissions;
    self.$onDestroy = _clean;

    function _getAllPermissions() {
      self.ready = false;
      if(self.userEmail){
        ProjectPermissionService.fetchPermissions(self.userEmail)
          .then(function (permissionManager) {
            self.ready = true;
        }).catch(function () {
          _showDialog("<h2>Não foi possível carregar as permissões de usuário!</h2><span class='md-caption'>Tente novamente mais tarde.</span>")
        });
      } else {
        _clean();
      }
    }

    function _clean() {
      delete self.managerUserPermission;
    }

    function _showDialog(message) {
      $mdDialog.show(
        $mdDialog.alert()
          .htmlContent(message)
          .ok("OK")
      );
    }


    return self;
  }
})();