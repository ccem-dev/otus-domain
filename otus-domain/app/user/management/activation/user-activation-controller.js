(function() {
    'use strict';

    angular
        .module('user.management')
        .controller('UserActivationController', UserActivationController);

    UserActivationController.$inject = ['$http', '$scope', '$filter', 'RestResourceService'];

    function UserActivationController($http, $scope, $filter, RestResourceService) {

        $scope.users = [];
        $scope.users.disabledUsers = [];
        $scope.users.activedUsers = [];
        $scope.loadUsers = fetchUsers();

        $scope.enableUsers = function() {
            var disabledUserForActivation = filterSelected($scope.users.disabledUsers);

            if (disabledUserForActivation.length > 0) {
                var userResource = RestResourceService.getUserResource();
                userResource.enable(disabledUserForActivation, function(response) {
                    fetchUsers();
                });
            }
        };

        $scope.disableUsers = function() {
            var enableUserForDisable = filterSelected($scope.users.activedUsers);

            if (enableUserForDisable.length > 0) {
                var userResource = RestResourceService.getUserResource();
                userResource.disable(enableUserForDisable, function(response) {
                    fetchUsers();
                });
            }
        };

        function filterSelected(users) {
            return ($filter('filter')(users, {
                selected: true
            }));
        }

        function fetchUsers() {
            var userResource = RestResourceService.getUserResource();
            userResource.fetch(function(response) {
                $scope.users.disabledUsers = response.data.disabledUsers;
                $scope.users.activedUsers = response.data.activedUsers;
            });
        }
    }
}());
