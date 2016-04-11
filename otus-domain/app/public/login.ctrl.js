angular.module('Login', ['ngMaterial', 'ngMessages', 'ui.mask']).controller('LoginController', function($scope, $http, $window, $location) {

    var HOSTNAME_NAV = 'http://' + window.location.hostname + ':' + window.location.port;
    var HOSTNAME_REST = 'http://' + window.location.hostname;

    var HTTP_POST_URL = HOSTNAME_REST + '/otus-domain-rest/session/rest/authentication/login';
    var HTTP_GET_SYSTEM_CONFIG_STATUS = HOSTNAME_REST + '/otus-domain-rest/session/rest/system/config/ready';
    var HTTP_GET_IS_LOGGED = HOSTNAME_REST + '/otus-domain-rest/session/rest/authentication/isLogged';

    var HTTP_URL_LOGIN_SUCCESS = HOSTNAME_NAV + '/otus-domain/app/private/index.html';
    var HTTP_URL_REGISTER_PAGE = HOSTNAME_NAV + '/otus-domain/app/public/user/register/user/register-user.html';
    var HTTP_URL_CONFIG_PAGE = HOSTNAME_NAV + '/otus-domain/app/public/setting/register-adm.html';
    var HTTP_URL_HOME_PAGE = HOSTNAME_NAV + '/otus-domain/app/private/index.html';


    $http.get(HTTP_GET_SYSTEM_CONFIG_STATUS).then(function(response) {

        if (!response.data.data) {
            $window.location.href = HTTP_URL_CONFIG_PAGE;
        } else {

            $http.get(HTTP_GET_IS_LOGGED).then(function(response) {
                if (response.data.data) {
                    $window.location.href = HTTP_URL_HOME_PAGE;
                }
            });
        }
    });

    $scope.authenticate = function(user) {
        $scope.invalidLogin = false;

        $http.post(HTTP_POST_URL, user).then(function(response) {

            if (response.data) {
                $window.location.href = HTTP_URL_LOGIN_SUCCESS;
                $scope.invalidLogin = false;
            } else {
                $scope.invalidLogin = true;
            }

        }, function(response) {
            console.log(response);
        });
    }

    $scope.register = function() {
        $window.location.href = HTTP_URL_REGISTER_PAGE;
    }

}).config(['$mdThemingProvider',
    function($mdThemingProvider) {

        $mdThemingProvider.theme('layoutTheme')
            .primaryPalette('blue', {
                'default': 'A200',
                'hue-1': '200'
            }).accentPalette('blue-grey', {
                'default': '900'
            }).warnPalette('red');


        $mdThemingProvider.theme('layoutTheme');
    }
]);
