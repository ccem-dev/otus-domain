(function() {

    angular
        .module('otusDomain')
        .config(['$stateProvider', '$urlRouterProvider', stateConfiguration])
        .constant('APP_STATE', {
            'LOGIN': 'login',
            'USER_REGISTER': 'user-register',
            'INSTALLER': 'installer',
            'HOME': 'home',
            'USER_ACTIVATION': 'user-activation',
            'PROJECT_CENTER': 'field-center',
            'ERROR_OFFLINE': 'offline'
        });

    function stateConfiguration($stateProvider, $urlRouterProvider) {

        var dashboardMenu = 'app/dashboard/menu/dashboard-menu.html';
        var mainDashBoardTemplate = 'app/dashboard/template/main-dashboard-template.html';

        $stateProvider
            .state('installer', {
                url: '/installer',
                resolve: {
                    onlyOneConfiguration: function(RouteRulesResolver) {
                        return RouteRulesResolver.onlyOneConfiguration();
                    }
                },
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
                resolve: {
                    loggedUser: function(RouteRulesResolver) {
                        return RouteRulesResolver.alreadyLogged();
                    },
                    initialConfiguration: function(RouteRulesResolver) {
                        return RouteRulesResolver.initialConfiguration();
                    }
                },
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
                resolve: {
                    initialConfiguration: function(RouteRulesResolver) {
                        return RouteRulesResolver.initialConfiguration();
                    }
                },
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
                resolve: {
                    loggedUser: function(RouteRulesResolver) {
                        return RouteRulesResolver.loggedUser();
                    }
                },
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
            .state('field-center', {
                url: '/project/centers',
                resolve: {
                    loggedUser: function(RouteRulesResolver) {
                        return RouteRulesResolver.loggedUser();
                    },
                    selectedProject: function(RouteRulesResolver) {
                        return RouteRulesResolver.selectedProject();
                    },
                    loadCenters: function(ProjectFieldCenterService) {
                        ProjectFieldCenterService.loadCenters();
                    }
                },
                views: {
                    'system-wrap': {
                        templateUrl: mainDashBoardTemplate,
                        controller: 'DashboardMenuController as dashboardMenu'
                    },
                    'dashboard-menu@field-center': {
                        templateUrl: dashboardMenu
                    },
                    'system-content@field-center': {
                        templateUrl: 'app/project/fieldCenter/field-center-template.html',
                        controller: 'FieldCenterController',
                        controllerAs: 'fieldCenterController'
                    }
                }
            })
            .state('home', {
                url: '/home',
                resolve: {
                    loggedUser: function(RouteRulesResolver) {
                        return RouteRulesResolver.loggedUser();
                    }
                },
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
            .state('offline', {
                url: '/offline',
                views: {
                    'system-wrap': {
                        templateUrl: 'app/response-error/offline/offline.html',
                        controller: 'ResponseErrorOfflineController as controller'
                    }
                }
            });

        $urlRouterProvider.otherwise('/login');
    }
}());
