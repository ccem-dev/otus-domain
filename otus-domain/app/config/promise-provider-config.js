(function() {

    /*

        Workaround for error: Possibly unhandled rejection: {}

    **/

    angular
        .module('otusDomain')
        .config(PromiseProviderConfig);

    PromiseProviderConfig.$inject = ['$qProvider'];

    function PromiseProviderConfig($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }

}());
