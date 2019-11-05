(function() {

    angular
        .module('otusDomain')
        .run(['RestResourceService', 'UserService', '$cookies', initConfiguration]);

    function initConfiguration(RestResourceService, UserService,$cookies) {
        RestResourceService.setUrl($cookies.get('Backend-Address'));
        UserService.reloadLoggedUser();
    }

}());
