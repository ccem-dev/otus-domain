(function() {

    angular
        .module('otusDomain')
        .run(['RestResourceService', '$window', initConfiguration]);

    function initConfiguration(RestResourceService, $window) {
        var __env = $window.__env;
        RestResourceService.setUrl(__env.apiUrl);
    }

}());
