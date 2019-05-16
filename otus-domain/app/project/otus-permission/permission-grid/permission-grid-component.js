(function () {
  'use strict';

  angular
    .module('otusDomain.project')
    .component('permissionGridComponent', {
      templateUrl: 'app/project/otus-permission/permission-grid/permission-grid-template.html',
      controller: 'permissionGridConteoller as $ctrl',
      bindings: {
        userEmail: "=",
      }
    })
    .controller('permissionGridConteoller', Controller);

  function Controller() {
    var self = this;

    function _getAllPermissions() {
      if(self.userEmail){
        ProjectPermissionService.getAll(self.userEmail).then(function (response) {
          if(response.permissionList) {
            self.managerUserPermission = response;
            self.surveyGroupPermission = self.managerUserPermission.findByType(PERMISSION_LIST.SURVEY_GROUP);
          }
        }).catch(function () {
          _showDialog("<h2>Não foi possível carregar as permissões de usuário!</h2><span class='md-caption'>Tente novamente mais tarde.</span>")
        });
      } else {
        delete self.managerUserPermission;
      }
    }


    return self;
  }
})();