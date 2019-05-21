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
    "PERMISSION_LIST",
    'ProjectPermissionService'
  ];

  function Controller($mdDialog, PERMISSION_LIST, ProjectPermissionService) {
    var self = this;
    self.$onInit = _getAllPermissions;
    self.$onDestroy = _clean;
    self.finder = finder;

    function f() {
      callFake()
        .then(resp => console.log("then: " + resp))
        .catch(err => console.log("catch: " + err));
    }

    function callFake() {
      return another()
        .then(resp => {
          try {
            erroer();
          } catch (e) {
            return Promise.reject("rejeitou");
          }
        })
    }

    function another() {
      return Promise.resolve("resolveu");
    }

    function erroer() {
      throw new Error("erroer");
    }

    function _getAllPermissions() {
      self.ready = false;
      if(self.userEmail){
        ProjectPermissionService.getAll(self.userEmail).then(function (permissionManager) {
          if(permissionManager.permissionList) {
            self.managerUserPermission = permissionManager;  //todo: rename
            self.surveyGroupPermission = self.managerUserPermission.findByType(PERMISSION_LIST.SURVEY_GROUP);
            self.laboratoryPermission = self.managerUserPermission.findByType(PERMISSION_LIST.LABORATORY);
            self.ready = true;
          }
        }).catch(function () {
          _showDialog("<h2>Não foi possível carregar as permissões de usuário!</h2><span class='md-caption'>Tente novamente mais tarde.</span>")
        });
      } else {
        _clean();
      }
    }

    function finder(permissionName) {
      return self.managerUserPermission.findByType(permissionName);
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