(function() {
  'use strict';

  angular
    .module('otusDomain.user.management')
    .controller('UserActivationController', UserActivationController);

  UserActivationController.$inject = ['RestResourceService', '$mdDialog', '$mdToast'];

  function UserActivationController(RestResourceService, $mdDialog, $mdToast) {
    var self = this;

    var DIALOG_TEXT_CONTENT = 'Você tem certeza que deseja alterar o status do usuário ?';
    var DIALOG_TITLE = 'Mudança de Status';
    var _domainUserResource;

    self.users = [];
    self.confirmDialog = confirmDialog;

    _init();

    function _init() {
      _domainUserResource = RestResourceService.getUserResource();
      _loadUsers();
    }

    function _changeStatus(user) {
      if (!user.enable) {
        disable(user);
      } else {
        enable(user);
      }
    }

    function confirmDialog(user) {
      var dialog = $mdDialog.confirm()
        .title(DIALOG_TITLE)
        .textContent(DIALOG_TEXT_CONTENT)
        .ok('Sim')
        .cancel('Cancelar');

      $mdDialog.show(dialog).then(function() {
        _changeStatus(user);
      }, function() {
        user.enable = !user.enable;
      });
    }

    function enable(user) {
      _domainUserResource.enable(user, function() {
        $mdToast.show(
          $mdToast.simple()
          .textContent('Usuário habilitado.')
        );
      });
    }

    function disable(user) {
      _domainUserResource.disable(user, function() {
        $mdToast.show(
          $mdToast.simple()
          .textContent('Usuário desabilitado.')
        );
      });
    }

    function _loadUsers() {
      _domainUserResource.list(function(response) {
        self.users = response.data;
      });
    }
  }

}());
