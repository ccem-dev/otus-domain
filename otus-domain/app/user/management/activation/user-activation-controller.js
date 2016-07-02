(function() {
    'use strict';

    angular
        .module('user.management')
        .controller('UserActivationController', UserActivationController);

    UserActivationController.$inject = ['$http', '$scope', '$filter', 'RestResourceService', '$mdDialog', '$mdToast'];

    function UserActivationController($http, $scope, $filter, RestResourceService, $mdDialog, $mdToast) {
        var DIALOG_TEXT_CONTENT = 'Você tem certeza que deseja alterar o status do usuário ?';
        var DIALOG_TITLE = 'Mudança de Estatus';
        var DIALOG_ARIA = 'Mudança de Status';

        $scope.users = [];
        $scope.loadUsers = loadUsers();
        $scope.changeStatus = changeStatus;
        $scope.confirmDialog = confirmDialog;

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
                .ariaLabel(DIALOG_ARIA)
                .ok('Sim')
                .cancel('Cancelar');

            $mdDialog.show(dialog).then(function(result) {
                changeStatus(user);
            }, function() {
                user.enable = !user.enable;
            });
        }

        function enable(user) {
            var userResource = RestResourceService.getUserResource();
            userResource.enable(user, function(response) {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent('Usuário habilitado.')
                );

                loadUsers();
            });
        }

        function disable(user) {
            var userResource = RestResourceService.getUserResource();
            userResource.disable(user, function(response) {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent('Usuário desabilitado.')
                );

                loadUsers();
            });
        }

        function loadUsers() {
            var userResource = RestResourceService.getUserResource();
            userResource.fetch(function(response) {
                $scope.users = response.data;
            });
        }
    }
}());
