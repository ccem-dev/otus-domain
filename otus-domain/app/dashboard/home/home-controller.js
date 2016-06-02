(function() {
    'use strict';

    angular
        .module('otusDomain.dashboard')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$http', '$scope', '$rootScope'];

    // TODO Deve realizar a verificação se o mesmo esta logado utilizando token
    function HomeController($http, $scope, $rootScope) {
        var $HTTP_GET_URL_LOGGED_USER = window.location.origin + '/otus-domain-rest/session/rest/register/loggedUser';

        $scope.loggedUser = {};

        $http.get($HTTP_GET_URL_LOGGED_USER).then(function(response) {
            $scope.loggedUser = response.data.data;
        });

        $scope.isAdmin = function(loggedUser) {
            return loggedUser.admin;
        };

        $scope.isNotAdmin = function(loggedUser) {
            return !(loggedUser.admin);
        };

        $scope.doesNotHasRepository = function() {
            if ($rootScope.repositories) {
                return $rootScope.repositories.length;
            }
        };

    }

}());
