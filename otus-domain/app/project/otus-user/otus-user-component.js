(function() {
  'use strict';

  angular
    .module('otusDomain.project')
    .component('otusUser', {
      templateUrl: 'app/project/otus-user/otus-user-template.html',
      controller: OtusUserController
    });

  OtusUserController.$inject = ['OtusRestResourceService', 'UserManagerFactory', '$mdDialog', '$mdToast'];

  function OtusUserController(OtusRestResourceService, UserManagerFactory, $mdDialog, $mdToast) {
    var self = this;
    var DIALOG_TEXT_CONTENT = 'Você tem certeza que deseja alterar o status do usuário?';
    var DIALOG_TITLE = 'Mudança de Status';
    var _userResource;
    var _fieldCenterResource;
    var _confirmDialog;
    var _UserManager;

    self.users = [];
    self.fieldCenters = [];

    self.$onInit = onInit;
    self.enableDisable = enableDisable;
    self.updateFieldCenter = updateFieldCenter;

    function onInit() {
      _userResource = OtusRestResourceService.getUserResource();
      _fieldCenterResource = OtusRestResourceService.getOtusFieldCenterResource();
      _UserManager = UserManagerFactory.create(_userResource);
      _createDialog();
      _loadUsers();
      _loadFieldCenters();
    }

    function enableDisable(user) {
      /*  When the user clicks on button the view already updated the model value.
          This occurs due the ng-model (data-binding).
          Then the logic of if-clause needs to be inverted.
      **/
      $mdDialog.show(_confirmDialog).then(function() {
        if (!user.enable) {
          _disable(user);
        } else {
          _enable(user);
        }
      }, function() {
        user.enable = !user.enable;
      });
    }

    function updateFieldCenter(user) {
      _UserManager.updateFieldCenter(angular.toJson(user)).then(function(httpResponse) {
        _showToast('Centro atualizado.');
      });
    }

    function _enable(user) {
      _UserManager.enable(user).then(function(httpResponse) {
        _showToast('Usuário habilitado.');
      });
    }

    function _disable(user) {
      _UserManager.disable(user).then(function(httpResponse) {
        _showToast('Usuário desabilitado.');
      });
    }

    function _loadUsers() {
      _UserManager.list().then(function(httpResponse) {
        self.users = httpResponse.data;
      });
    }

    function _loadFieldCenters() {
      _fieldCenterResource.getAll(function(httpResponse) {
        self.fieldCenters = httpResponse.data;
      });
    }

    function _createDialog() {
      _confirmDialog = $mdDialog.confirm()
        .title(DIALOG_TITLE)
        .textContent(DIALOG_TEXT_CONTENT)
        .ok('Sim')
        .cancel('Cancelar');
    }

    function _showToast(message) {
      $mdToast.show(
        $mdToast.simple()
        .textContent(message)
      );
    }
  }

})();
