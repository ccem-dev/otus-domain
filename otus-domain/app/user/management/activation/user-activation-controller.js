(function() {
    'use strict';

    angular
        .module('user.management')
        .controller('UserActivationController', UserActivationController);

    UserActivationController.$inject = ['$http', '$scope', '$filter', 'RestResourceService', 'OtusRestResourceService', '$mdDialog', '$mdToast', 'userManagementType'];

    function UserActivationController($http, $scope, $filter, RestResourceService, OtusRestResourceService, $mdDialog, $mdToast, userManagementType) {
        var DIALOG_TEXT_CONTENT = 'Você tem certeza que deseja alterar o status do usuário ?';
        var DIALOG_TITLE = 'Mudança de Estatus';
        var clientSelected = null;

        $scope.users = [];
        $scope.loadUsers = loadUsers;
        $scope.changeStatus = changeStatus;
        $scope.confirmDialog = confirmDialog;
        $scope.headerDomain = false;
        $scope.headerOtus = false;

        _init();

        function _init() {
            if (userManagementType === 'domain') {
                clientSelected = RestResourceService;
                buildHeaderDomain();
            } else {
                clientSelected = OtusRestResourceService;
                buildHeaderOtus();
            }
            loadUsers();
        }

        function buildHeaderDomain() {
            $scope.headerDomain = true;
            $scope.headerOtus = false;
        }

        function buildHeaderOtus() {
            $scope.headerDomain = false;
            $scope.headerOtus = true;
        }

        function changeStatus(user) {
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
                changeStatus(user);
            }, function() {
                user.enable = !user.enable;
            });
        }

        function enable(user) {
            var userResource = clientSelected.getUserResource();
            userResource.enable(user, function() {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent('Usuário habilitado.')
                );
            });
        }

        function disable(user) {
            var userResource = clientSelected.getUserResource();
            userResource.disable(user, function() {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent('Usuário desabilitado.')
                );
            });
        }

        function loadUsers() {
            var userResource = clientSelected.getUserResource();
            userResource.list(function(response) {
                $scope.users = response.data;
            });
        }
    }
}());
