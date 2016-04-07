(function() {

    angular
        .module('studio')
        .config(['$stateProvider', '$urlRouterProvider', stateConfiguration])
        .constant('APP_STATE', {
            'HOME': 'home',
            'SURVEY_FORMS': 'survey-forms',
            'EDITOR': 'editor',
            'USER_MANAGEMENT': 'user-management',
            'CREATE_REPOSITORY': 'repository?actionType=NEW',
            'CONNECT_REPOSITORY': 'repository?actionType=CONNECT',
            'LOGOUT': '/otus-domain-rest/session/rest/authentication/logout'
        });

    function stateConfiguration($stateProvider, $urlRouterProvider) {

        var dashboardMenu = 'app/private/dashboard/menu/dashboard-menu.html';

        $stateProvider
            .state('home', {
                url: '/home',
                views: {
                    'dashboard-menu': {
                        templateUrl: dashboardMenu
                    },
                    'system-content': {
                        templateUrl: 'app/private/dashboard/template/dashboard-content-template.html'
                    },
                    'section-info@home': {
                        templateUrl: 'app/private/dashboard/home/home-info-section.html'
                    },
                    'section-view@home': {
                        templateUrl: 'app/private/dashboard/home/home-view-section.html'
                    },
                    'section-commands@home': {
                        templateUrl: 'app/private/dashboard/home/home-commands-section.html'
                    }
                }
            })
            .state('user-management', {
                url: '/user-management',
                views: {
                    'dashboard-menu': {
                        templateUrl: dashboardMenu
                    },
                    'system-content': {
                        templateUrl: 'app/shared/otus-domain/user/management/users.html'
                    }
                }
            })
            .state('repository', {
                url: '/repository',
                views: {
                    'dashboard-menu': {
                        templateUrl: dashboardMenu
                    },
                    'system-content': {
                        templateUrl: 'app/shared/otus-domain/survey-repository/repository.html'
                    }
                }
            });

        /* Default state (route) */
        $urlRouterProvider.otherwise('/home');
    }
}());
