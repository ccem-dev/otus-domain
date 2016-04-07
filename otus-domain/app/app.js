(function() {

    angular
        .module('studio', [
            /* External modules */
            'dependencies',
            /* Application modules */
            'studio.dashboard',
            /* Otus platform modules */
            'repository',
            'user',
            'ui.components',
            'utils'
        ])
        .run(function(DashboardStateService) {
            DashboardStateService.goToHome();
        });

}());
