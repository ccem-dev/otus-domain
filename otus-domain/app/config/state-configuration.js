(function() {

    angular
        .module('otusDomain')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', stateConfiguration])
        .constant('APP_STATE', {
            'LOGIN': 'login',
            'USER_REGISTER': 'user/register',
            'INSTALLER': 'installer',
            'HOME': 'home',
            'USER_ACTIVATION': 'user/activation',
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
                    },
                    'repository-config@installer': {
                        templateUrl: 'app/survey-repository/repository.html',
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
            });

        /* Default state (route) */
        $urlRouterProvider.otherwise('/login');
        $locationProvider.html5Mode(true);
    }
}());
