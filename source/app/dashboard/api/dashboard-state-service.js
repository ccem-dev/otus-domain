(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .service('DashboardStateService', DashboardStateService);

  DashboardStateService.$inject = [
    '$state',
    '$http',
    'APP_STATE',
    'RestResourceService',
    'OtusRestResourceService'
  ];

  function DashboardStateService($state, $http, APP_STATE, UserService, RestResourceService, OtusRestResourceService) {
    var self = this;

    /* Public interface */
    self.goToHome = goToHome;
    self.goToUserActivationInProject = goToUserActivationInProject;
    self.goToProjectCenters = goToProjectCenters;
    self.goToProjectConfiguration = goToProjectConfiguration;
    self.goToErrorOffline = goToErrorOffline;
    self.goToProjectActivityConfiguration = goToProjectActivityConfiguration;
    self.goToActivitySettings = goToActivitySettings;
    self.goToProjectReportManager = goToProjectReportManager;
    self.goToProjectDatasourceManager = goToProjectDatasourceManager;
    self.goToFollowUpConfiguration = goToFollowUpConfiguration;
    self.goToLocationPoint = goToLocationPoint;
    self.goToErrorMissingProject = goToErrorMissingProject;
    self.goToLaboratoryConfiguration = goToLaboratoryConfiguration;
    self.goToGroupConfiguration = goToGroupConfiguration;
    self.logout = logout;

    init();

    function init() {
      self.currentState = 'Login';
    }

    function goToHome() {
      self.currentState = 'Home';
      $state.go(APP_STATE.HOME);
    }

    function goToUserActivationInProject() {
      self.currentState = 'Liberação de usuários no projeto selecionado';
      $state.go(APP_STATE.USER_ACTIVATION_IN_PROJECT);
    }

    function goToProjectCenters() {
      self.currentState = 'Centros';
      $state.go(APP_STATE.PROJECT_CENTER);
    }

    function goToProjectActivityConfiguration() {
      self.currentState = 'Configurações de atividades';
      $state.go(APP_STATE.PROJECT_ACTIVITY_CONFIGURATION);
    }

    function goToActivitySettings() {
      self.currentState = 'Configuração de atividade';
      $state.go(APP_STATE.ACTIVITY_SETTINGS);
    }

    function goToProjectReportManager() {
      self.currentState = 'Gerenciador de relatórios';
      $state.go(APP_STATE.REPORT_MANAGER);
    }

    function goToProjectDatasourceManager() {
      self.currentState = 'Gerenciador de dados';
      $state.go(APP_STATE.DATASOURCE_MANAGER);
    }


    function goToProjectConfiguration() {
      self.currentState = 'Configurações de Projeto';
      $state.go(APP_STATE.PROJECT_CONFIGURATION);
    }

    function goToLocationPoint() {
      self.currentState = 'Configurações de Destino para transporte';
      $state.go(APP_STATE.LOCATION_POINT);
    }

    function goToFollowUpConfiguration() {
      self.currentState = 'Configurações de Seguimentos';
      $state.go(APP_STATE.FOLLOW_UP_CONFIGURATION);
    }

    function goToErrorOffline() {
      self.currentState = 'Offline';
      $state.go(APP_STATE.ERROR_OFFLINE);
    }


    function goToErrorMissingProject() {
      self.currentState = 'MissingProject';
      $state.go(APP_STATE.ERROR_MISSING_PROJECT);
    }

    function goToLaboratoryConfiguration() {
      self.currentState = 'Configurações de laboratório';
      $state.go(APP_STATE.LABORATORY_CONFIGURATION);
    }

    function goToGroupConfiguration(){
      self.currentState = 'Configuração de grupo';
      $state.go(APP_STATE.GROUP_CONFIGURATION);
    }

    function logout() {
      var authenticatorResource = RestResourceService.getAuthenticatorResource();
      authenticatorResource.invalidate(function () {
        RestResourceService.removeSecurityToken();
        OtusRestResourceService.removeSecurityToken();
      });
    }
  }

}());
