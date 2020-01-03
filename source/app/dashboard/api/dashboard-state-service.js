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

  function DashboardStateService($state, $http, APP_STATE, RestResourceService, OtusRestResourceService) {
    var self = this;

    /* Public interface */
    self.goToLogin = goToLogin;
    self.goToHome = goToHome;
    self.goToInstaller = goToInstaller;
    self.goToUserRegister = goToUserRegister;
    self.goToUserActivation = goToUserActivation;
    self.goToUserActivationInProject = goToUserActivationInProject;
    self.goToProjectCenters = goToProjectCenters;
    self.goToProjectConfiguration = goToProjectConfiguration;
    self.goToErrorOffline = goToErrorOffline;
    self.goToProjectActivityConfiguration = goToProjectActivityConfiguration;
    self.goToActivitySettings = goToActivitySettings;
    self.goToProjectReportManager = goToProjectReportManager;
    self.goToProjectDatasourceManager = goToProjectDatasourceManager;
    self.goToOutcomeConfiguration = goToOutcomeConfiguration;
    self.logout = logout;

    init();

    function init() {
      self.currentState = 'Login';
    }

    function goToLogin() {
      self.currentState = 'Login';
      $state.go(APP_STATE.LOGIN);
    }

    function goToInstaller() {
      self.currentState = 'Instalador do Sistema';
      $state.go(APP_STATE.INSTALLER);
    }

    function goToUserRegister() {
      self.currentState = 'Cadastro de Usuário';
      $state.go(APP_STATE.USER_REGISTER);
    }

    function goToHome() {
      self.currentState = 'Home';
      $state.go(APP_STATE.HOME);
    }

    function goToUserActivation() {
      self.currentState = 'Liberação de Usuários';
      $state.go(APP_STATE.USER_ACTIVATION);
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

    function goToOutcomeConfiguration() {
      self.currentState = 'Configurações de Desfechos';
      $state.go(APP_STATE.OUTCOME_CONFIGURATION);
    }

    function goToErrorOffline() {
      self.currentState = 'Offline';
      $state.go(APP_STATE.ERROR_OFFLINE);
    }

    function logout() {
      var authenticatorResource = RestResourceService.getAuthenticatorResource();
      authenticatorResource.invalidate(function () {
        RestResourceService.removeSecurityToken();
        OtusRestResourceService.removeSecurityToken();

        goToLogin();
      });
    }
  }

}());
