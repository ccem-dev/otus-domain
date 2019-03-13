(function() {
  'use strict';

  angular
    .module('otusDomain.project')
    .component('otusUserManager', {
      templateUrl: 'app/project/otus-user/manager/otus-user-manager-template.html',
      controller: Controller,
      bindings:{
        selectedUser: "<",
        updateUsers: "&"
      }
    });

    Controller.$inject = [
      'OtusRestResourceService',
      'ExtractionRestService',
      'UserManagerFactory',
      '$mdDialog',
      '$mdToast'
    ];

  function Controller(OtusRestResourceService, ExtractionRestService, UserManagerFactory, $mdDialog, $mdToast) {
    var self = this;
    var DIALOG_TEXT_CONTENT = 'Você tem certeza que deseja alterar o status do usuário?';
    var DIALOG_TITLE = 'Mudança de Status';
    var EXTRACTION_DIALOG_TEXT_CONTENT = 'Você tem certeza que deseja alterar o status de Extração do usuário?';
    var EXTRACTION_DIALOG_TITLE = 'Mudança de Status para Extração de Dados';
    var _userResource;
    var _fieldCenterResource;
    var _confirmDialog;
    var _confirmExtractionDialog;
    var _UserManager;

    self.users = [];
    self.fieldCenters = [];
    self.activeUsers = true;
    self.extractionUsers = false;
    self.userCenter = "";

    self.$onInit = onInit;
    self.enableDisable = enableDisable;
    self.updateFieldCenter = updateFieldCenter;
    self.enableDisableExtraction = enableDisableExtraction;

    function onInit() {
      self.user = self.selectedUser;
      _userResource = OtusRestResourceService.getUserResource();
      _fieldCenterResource = OtusRestResourceService.getOtusFieldCenterResource();
      _UserManager = UserManagerFactory.create(_userResource);
      _createDialog();
      _loadFieldCenters();
    }

    function enableDisable(user) {
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

    function enableDisableExtraction(user) {
      $mdDialog.show(_confirmExtractionDialog).then(function() {
        if (!user.extraction) {
          _disableExtraction(user);
        } else {
          _enableExtraction(user);
        }
      }, function() {
        user.extraction = !user.extraction;
      });
    }

    function updateFieldCenter(user) {
      _UserManager.updateFieldCenter(angular.toJson(user)).then(function(httpResponse) {
        _showToast('Centro atualizado.');
       self.updateUsers();
      });
    }

    function _enable(user) {
      _UserManager.enable(user).then(function(httpResponse) {
        _showToast('Usuário habilitado.');
       self.updateUsers();
      });
    }

    function _disable(user) {
      _UserManager.disable(user).then(function(httpResponse) {
        if(user.extraction) {
          user.extraction = false;
          _disableExtraction(user);
        }
        _showToast('Usuário desabilitado.');
       self.updateUsers();
      });
    }

    function _enableExtraction(user) {
      ExtractionRestService.enableExtraction(user).then(function(httpResponse) {
        _showToast('Extração habilitada.');
       self.updateUsers();
      });
    }

    function _disableExtraction(user) {
      ExtractionRestService.disableExtraction(user).then(function(httpResponse) {
        _showToast('Extração desabilitada.');
       self.updateUsers();
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

      _confirmExtractionDialog = $mdDialog.confirm()
        .title(EXTRACTION_DIALOG_TITLE)
        .textContent(EXTRACTION_DIALOG_TEXT_CONTENT)
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
