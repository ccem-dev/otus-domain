(function() {

    angular
        .module('otusDomain')
        .run(['RestResourceService', '$window', 'UserService', initConfiguration]);

    function initConfiguration(RestResourceService, $window, UserService) {
        var __env = $window.__env;

        RestResourceService.setUrl(__env.apiUrl);
        UserService.reloadLoggedUser();

    }

}());
