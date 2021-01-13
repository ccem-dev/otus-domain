(function() {

    angular
        .module('otusDomain')
        .run(['RestResourceService', 'UserService', 'AuthService', '$cookies', initConfiguration]);

    function initConfiguration(RestResourceService, UserService, AuthService, $cookies) {
        RestResourceService.setUrl($cookies.get('Backend-Address'));
        AuthService.keycloakInit();
    }

}());
