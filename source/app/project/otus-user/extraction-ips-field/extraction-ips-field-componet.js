(function () {
  'use strict';

  angular
    .module('otusDomain.project')
    .component('extractiosIpsField', {
      templateUrl: 'app/project/otus-user/extraction-ips-field/extraction-ips-field-teamplate.html',
      controller: Controller,
      bindings: {
        user: '=',
        userIndex: '<'
      }
    });

  Controller.$inject = [
    'ExtractionRestService',
    '$mdDialog',
    '$mdToast',
    '$element'
  ];

  function Controller(ExtractionRestService, $mdDialog, $mdToast, $element) {
    var self = this;
    var EXTRACTION_IPS_CHANGE_DIALOG_TITLE = 'Alteração nos IPs de extração';
    var EXTRACTION_IPS_CHANGE_DIALOG_TEXT_CONTENT = 'Você tem certeza que deseja alterar os IPs de Extração do usuário?';
    var _confirmExtractionIpsChangeDialog;

    self.$onInit = onInit;
    self.onIpChange = onIpChange;

    function onInit() {
      self.cloneExtractionIps = angular.copy(self.user.extractionIps);
      _createDialog();
    }

    function onIpChange() {
      $mdDialog.show(_confirmExtractionIpsChangeDialog).then(function () {
        self.cloneExtractionIps = angular.copy(self.user.extractionIps);
        _updateExtractionIps();
        $element.find('#userIp' + self.userIndex).focus();
      }, function () {
        self.user.extractionIps = angular.copy(self.cloneExtractionIps);
        $element.find('#userIp' + self.userIndex).focus();        
      });
    }

    function _updateExtractionIps() {
      ExtractionRestService.updateExtractionIps(self.user).then(function (httpResponse) {
        _showToast('Ip(s) atualizado(s).');
      });
    }

    function _createDialog() {
      _confirmExtractionIpsChangeDialog = $mdDialog.confirm()
        .title(EXTRACTION_IPS_CHANGE_DIALOG_TITLE)
        .textContent(EXTRACTION_IPS_CHANGE_DIALOG_TEXT_CONTENT)
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