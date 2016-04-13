(function() {

    angular
        .module('otusDomain')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', stateConfiguration])
        .constant('APP_STATE', {
            'LOGIN': 'login',
            'USER_REGISTER': 'user/register',
            'INSTALLER': 'installer',
            'HOME': 'home',
            'SURVEY_FORMS': 'survey-forms',
            'USER_ACTIVATION': 'user/activation',
            'CREATE_REPOSITORY': 'repository?actionType=NEW',
            'CONNECT_REPOSITORY': 'repository?actionType=CONNECT',
            'LOGOUT': '/otus-domain-rest/session/rest/authentication/logout'
        });

    function stateConfiguration($stateProvider, $urlRouterProvider, $locationProvider) {

        var dashboardMenu = 'app/dashboard/menu/dashboard-menu.html';
        var mainDashBoardTemplate = 'app/dashboard/template/main-dashboard-template.html';

        $stateProvider
            .state('installer', {
                url: '/installer',
                views: {
                    'system-wrap': {
                        templateUrl: 'app/installer/initial/initial-config.html',
                        controller: 'InitialConfigController',
                        controllerAs: 'initialConfigController'
                    }
                }
            })
            .state('login', {
                url: '/login',
                views: {
                    'system-wrap': {
                        templateUrl: 'app/authenticator/login/login.html',
                        controller: 'LoginController',
                        controllerAs: 'loginController'
                    }
                }
            })
            .state('user-register', {
                url: '/user/register',
                views: {
                    'system-wrap': {
                        templateUrl: 'app/user/management/registry/user-register.html',
                        controller: 'UserRegisterController',
                        controllerAs: 'userRegisterController'
                    }
                }
            })
            .state('user-activation', {
                url: '/user/activation',
                views: {
                    'system-wrap': {
                        templateUrl: mainDashBoardTemplate,
                        controller: 'DashboardMenuController as dashboardMenu'
                    },
                    'dashboard-menu@user-activation': {
                        templateUrl: dashboardMenu

                    },
                    'system-content@user-activation': {
                        templateUrl: 'app/user/management/activation/user-activation.html',
                        controller: 'UserActivationController',
                        controllerAs: 'userActivationController'
                    }
                }
            })
            .state('home', {
                url: '/home',
                views: {
                    'system-wrap': {
                        templateUrl: mainDashBoardTemplate,
                        controller: 'DashboardMenuController as dashboardMenu'
                    },
                    'dashboard-menu@home': {
                        templateUrl: dashboardMenu
                    },
                    'system-content@home': {
                        templateUrl: 'app/dashboard/template/dashboard-content-template.html'
                    },
                    'section-info@home': {
                        templateUrl: 'app/dashboard/home/home-info-section.html'
                    },
                    'section-view@home': {
                        templateUrl: 'app/dashboard/home/home-view-section.html'
                    },
                    'section-commands@home': {
                        templateUrl: 'app/dashboard/home/home-commands-section.html'
                    }
                }
            })
            .state('repository', {
                url: '/repository',
                views: {
                    'system-wrap': {
                        templateUrl: mainDashBoardTemplate,
                        controller: 'DashboardMenuController as dashboardMenu'
                    },
                    'dashboard-menu@repository': {
                        templateUrl: dashboardMenu
                    },
                    'system-content@repository': {
                        templateUrl: 'app/survey-repository/repository.html'
                    }
                }
            });

        /* Default state (route) */
        $urlRouterProvider.otherwise('/login');
        $locationProvider.html5Mode(true);
    }
}());
