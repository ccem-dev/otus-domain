(function () {

  angular
    .module('otusDomain')
    .config(['$stateProvider', '$urlRouterProvider', stateConfiguration])
    .constant('APP_STATE', {
      'HOME': 'home',
      'USER_ACTIVATION_IN_PROJECT': 'user-otus-management',
      'PROJECT_CENTER': 'field-center',
      'PROJECT_ACTIVITY_CONFIGURATION': 'activity_configuration',
      'LABORATORY_CONFIGURATION_FLOW': 'laboratory_configuration_flow',
      'ACTIVITY_SETTINGS': 'activity_settings',
      'ERROR_OFFLINE': 'offline',
      'PROJECT_CONFIGURATION': 'configuration-center',
      'FOLLOW_UP_CONFIGURATION': 'follow-up',
      'DATASOURCE_MANAGER':'datasource_manager',
      'REPORT_MANAGER': 'report_manager',
      'LOCATION_POINT': 'location-point',
      'ERROR_MISSING_PROJECT': 'missing-project',
      'LABORATORY_CONFIGURATION': 'laboratory_configuration'
    });

  stateConfiguration.$inject = [
    '$stateProvider',
    '$urlRouterProvider'
  ];

  function stateConfiguration($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('user-otus-management', {
        url: '/project/user',
        resolve: {
          loggedUser: function (RouteRulesResolver) {
            return RouteRulesResolver.loggedUser();
          },
          selectedProject: function (RouteRulesResolver) {
            return RouteRulesResolver.selectedProject();
          },
          initialize: function (SurveyGroupRestService, PermissionRestService) {
            SurveyGroupRestService.initialize();
            PermissionRestService.initialize();
          }
        },
        views: {
          'system-wrap': {
            templateUrl: 'app/dashboard/template/main-dashboard-template.html',
            controller: 'DashboardMenuController as dashboardMenu'
          },
          'dashboard-menu@user-otus-management': {
            templateUrl: 'app/dashboard/menu/dashboard-menu.html'
          },
          'system-content@user-otus-management': {
            template: '<otus-user-dashboard></otus-user-dashboard>'
          }
        }
      })
      .state('field-center', {
        url: '/project/centers',
        resolve: {
          loggedUser: function (RouteRulesResolver) {
            return RouteRulesResolver.loggedUser();
          },
          selectedProject: function (RouteRulesResolver) {
            return RouteRulesResolver.selectedProject();
          },
          loadCenters: function (ProjectFieldCenterService) {
            ProjectFieldCenterService.loadCenters();
          }
        },
        views: {
          'system-wrap': {
            templateUrl: 'app/dashboard/template/main-dashboard-template.html',
            controller: 'DashboardMenuController as dashboardMenu'
          },
          'dashboard-menu@field-center': {
            templateUrl: 'app/dashboard/menu/dashboard-menu.html'
          },
          'system-content@field-center': {
            templateUrl: 'app/project/fieldCenter/field-center-template.html',
            controller: 'FieldCenterController',
            controllerAs: 'fieldCenterController'
          }
        }
      })
        .state('location-point', {
          url: '/project/location/point',
          resolve: {
            loggedUser: function (RouteRulesResolver) {
              return RouteRulesResolver.loggedUser();
            },
            selectedProject: function (RouteRulesResolver) {
              return RouteRulesResolver.selectedProject();
            },
            loadLocations: function (LocationPointRestService) {
              LocationPointRestService.initialize();
            }
          },
          views: {
            'system-wrap': {
              templateUrl: 'app/dashboard/template/main-dashboard-template.html',
              controller: 'DashboardMenuController as dashboardMenu'
            },
            'dashboard-menu@location-point': {
              templateUrl: 'app/dashboard/menu/dashboard-menu.html'
            },
            'system-content@location-point': {
              templateUrl: 'app/project/location/point/location-point-template.html',
              controller: 'locationPointCtrl',
              controllerAs: '$ctrl'
            }
          }
        })
      .state({
        name: 'activity_configuration',
        url: '/project/activity_configuration',
        resolve: {
          loggedUser: function (RouteRulesResolver) {
            return RouteRulesResolver.loggedUser();
          },
          selectedProject: function (RouteRulesResolver) {
            return RouteRulesResolver.selectedProject();
          },
          initialize: function (ActivityConfigurationRestService, SurveyGroupRestService) {
            ActivityConfigurationRestService.initialize();
            SurveyGroupRestService.initialize();
          }
        },
        views: {
          'system-wrap': {
            templateUrl: 'app/dashboard/template/main-dashboard-template.html',
            controller: 'DashboardMenuController as dashboardMenu'
          },
          'dashboard-menu@activity_configuration': {
            templateUrl: 'app/dashboard/menu/dashboard-menu.html'
          },
          'system-content@activity_configuration': {
            template: '<activity-configuration flex></activity-configuration>'
          }
        }
      })
      .state({
        name: 'activity_settings',
        url: '/project/activity_configuration/settings',
        resolve: {
          loggedUser: function (RouteRulesResolver) {
            return RouteRulesResolver.loggedUser();
          },
          selectedProject: function (RouteRulesResolver) {
            return RouteRulesResolver.selectedProject();
          },
          initialize: function (ActivityConfigurationRestService, SurveyGroupRestService) {
            ActivityConfigurationRestService.initialize();
            SurveyGroupRestService.initialize();
          }
        },
        views: {
          'system-wrap': {
            templateUrl: 'app/dashboard/template/main-dashboard-template.html',
            controller: 'DashboardMenuController as dashboardMenu'
          },
          'dashboard-menu@activity_settings': {
            templateUrl: 'app/dashboard/menu/dashboard-menu.html'
          },
          'system-content@activity_settings': {
            template: '<activity-settings flex="80"></activity-settings>'
          }
        }
      })
      .state({
        name: 'report_manager',
        url: '/project/report_manager',
        resolve: {
          loggedUser: function (RouteRulesResolver) {
            return RouteRulesResolver.loggedUser();
          },
          selectedProject: function (RouteRulesResolver) {
            return RouteRulesResolver.selectedProject();
          },
          initialize: function (ReportRestService) {
            ReportRestService.initialize();
          }
        },
        views: {
          'system-wrap': {
            templateUrl: 'app/dashboard/template/main-dashboard-template.html',
            controller: 'DashboardMenuController as dashboardMenu'
          },
          'dashboard-menu@report_manager': {
            templateUrl: 'app/dashboard/menu/dashboard-menu.html'
          },
          'system-content@report_manager': {
            template: '<report-manager flex></report-manager>'
          }
        }
      })
      .state({
        name: 'datasource_manager',
        url: '/project/datasource_manager',
        resolve: {
          loggedUser: function (RouteRulesResolver) {
            return RouteRulesResolver.loggedUser();
          },
          selectedProject: function (RouteRulesResolver) {
            return RouteRulesResolver.selectedProject();
          },
          initialize: function (DatasourceRestService) {
            DatasourceRestService.initialize();
          }
        },
        views: {
          'system-wrap': {
            templateUrl: 'app/dashboard/template/main-dashboard-template.html',
            controller: 'DashboardMenuController as dashboardMenu'
          },
          'dashboard-menu@datasource_manager': {
            templateUrl: 'app/dashboard/menu/dashboard-menu.html'
          },
          'system-content@datasource_manager': {
            template: '<datasource-manager flex></datasource-manager>'
          }
        }
      })
      .state('home', {
        url: '/home',
        resolve: {
          loggedUser: function (RouteRulesResolver) {
            return RouteRulesResolver.loggedUser();
          }
        },
        views: {
          'system-wrap': {
            templateUrl: 'app/dashboard/template/main-dashboard-template.html',
            controller: 'DashboardMenuController as dashboardMenu'
          },
          'dashboard-menu@home': {
            templateUrl: 'app/dashboard/menu/dashboard-menu.html'
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
      .state('configuration-center', {
        url: '/project/configuration',
        resolve: {
          loggedUser: function (RouteRulesResolver) {
            return RouteRulesResolver.loggedUser();
          },
          selectedProject: function (RouteRulesResolver) {
            return RouteRulesResolver.selectedProject();
          },
          initialize: function (ActivityConfigurationRestService, SurveyGroupRestService) {
            ActivityConfigurationRestService.initialize();
            SurveyGroupRestService.initialize();
          }
        },
        views: {
          'system-wrap': {
            templateUrl: 'app/dashboard/template/main-dashboard-template.html',
            controller: 'DashboardMenuController as dashboardMenu'
          },
          'dashboard-menu@configuration-center': {
            templateUrl: 'app/dashboard/menu/dashboard-menu.html'
          },
          'system-content@configuration-center': {
            templateUrl: 'app/project/configuration/configuration-template.html',
            controller: 'otusjs.otus-domain.project.configuration.ProjectConfigurationController',
            controllerAs: 'configController'
          }
        }
      })
      .state({
        name: 'follow-up',
        url: '/project/follow-up',
        resolve: {
          loggedUser: function (RouteRulesResolver) {
            return RouteRulesResolver.loggedUser();
          },
          selectedProject: function (RouteRulesResolver) {
            return RouteRulesResolver.selectedProject();
          },
          initialize: function (ActivityConfigurationRestService, SurveyGroupRestService, FollowUpRestService, EventRestService) {
            ActivityConfigurationRestService.initialize();
            SurveyGroupRestService.initialize();
            FollowUpRestService.initialize();
            EventRestService.initialize();
          }
        },
        views: {
          'system-wrap': {
            templateUrl: 'app/dashboard/template/main-dashboard-template.html',
            controller: 'DashboardMenuController as dashboardMenu'
          },
          'dashboard-menu@follow-up': {
            templateUrl: 'app/dashboard/menu/dashboard-menu.html'
          },
          'system-content@follow-up': {
            template: '<follow-up-configuration flex></follow-up-configuration>'
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
      })
      .state('missing-project', {
        url: '/missing-project',
        views: {
          'system-wrap': {
            templateUrl: 'app/response-error/missingProjectConfig/missing-project-config-template.html',
            controller: 'ResponseErrorMissingProjectController as controller'
          }
        }
      })
      .state({
        name: 'laboratory_configuration',
        url: '/project/laboratory_configuration',
        resolve: {
          loggedUser: function (RouteRulesResolver) {
            return RouteRulesResolver.loggedUser();
          },
          selectedProject: function (RouteRulesResolver) {
            return RouteRulesResolver.selectedProject();
          },
          initialize: function (ActivityConfigurationRestService, SurveyGroupRestService) {
            ActivityConfigurationRestService.initialize();
            SurveyGroupRestService.initialize();
          }
        },
        views: {
          'system-wrap': {
            templateUrl: 'app/dashboard/template/main-dashboard-template.html',
            controller: 'DashboardMenuController as dashboardMenu'
          },
          'dashboard-menu@laboratory_configuration': {
            templateUrl: 'app/dashboard/menu/dashboard-menu.html'
          },
          'system-content@laboratory_configuration': {
            template: '<laboratory-configuration flex></laboratory-configuration>'
          }
        }
      }).state({
      name: 'laboratory_configuration_flow',
      url: '/project/laboratory-configuration-flow',
      resolve: {
        loggedUser: function (RouteRulesResolver) {
          return RouteRulesResolver.loggedUser();
        },
        selectedProject: function (RouteRulesResolver) {
          return RouteRulesResolver.selectedProject();
        },
        initialize: function (ActivityConfigurationRestService, SurveyGroupRestService) {
          ActivityConfigurationRestService.initialize();
          SurveyGroupRestService.initialize();
        }
      },
      views: {
        'system-wrap': {
          templateUrl: 'app/dashboard/template/main-dashboard-template.html',
          controller: 'DashboardMenuController as dashboardMenu'
        },
        'dashboard-menu@laboratory_configuration_flow': {
          templateUrl: 'app/dashboard/menu/dashboard-menu.html'
        },
        'system-content@laboratory_configuration_flow': {
          template: '<laboratory-configuration-flow flex></laboratory-configuration-flow>'
        }
      }
    });
  }
}());
