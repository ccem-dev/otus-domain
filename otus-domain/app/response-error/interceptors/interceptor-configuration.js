(function() {

    angular
        .module('otusDomain')
        .config(['$httpProvider', interceptorConfiguration]);

    function interceptorConfiguration($httpProvider) {
        $httpProvider.interceptors.push('otusDomain.ResponseInterceptor');
    }

}());
