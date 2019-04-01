(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .controller('DashboardMenuController', DashboardMenuController);

  DashboardMenuController.$inject = [
    'LogoutDialogService',
    'DashboardStateService',
    '$mdSidenav',
    'ProjectSelectionService',
    'ProjectContext'
  ];

  function DashboardMenuController(LogoutDialogService, DashboardStateService, $mdSidenav, ProjectSelectionService, ProjectContext) {
    var self = this;

    /* Public interface */
    self.getSelectedSystemArea = getSelectedSystemArea;
    self.open = open;
    self.close = close;
    self.openHome = openHome;
    self.openUserActivation = openUserActivation;
    self.logout = logout;
    self.openProjectCenters = openProjectCenters;
    self.openUserActivationInProject = openUserActivationInProject;
    self.openProjectConfiguration = openProjectConfiguration;
    self.openProjectActivityConfiguration = openProjectActivityConfiguration;
    self.openReportManager = openReportManager;
    self.openDatasourceManager = openDatasourceManager;

    function getSelectedSystemArea() {
      return DashboardStateService.currentState;
    }

    function open() {
      $mdSidenav('left').toggle();
    }

    function close() {
      $mdSidenav('left').close();
    }

    function openHome() {
      DashboardStateService.goToHome();
      close();
    }

    function openUserActivation() {
      DashboardStateService.goToUserActivation();
      close();
    }

    function openUserActivationInProject() {
      DashboardStateService.goToUserActivationInProject();
      close();
    }

    function openProjectActivityConfiguration() {
      DashboardStateService.goToProjectActivityConfiguration();
      close();
    }

    function openReportManager() {
      DashboardStateService.goToProjectReportManager();
      close();
    }

    function openDatasourceManager() {
      DashboardStateService.goToProjectDatasourceManager();
      close();
    }

    function openProjectCenters() {
      DashboardStateService.goToProjectCenters();
      close();
    }

    function openProjectConfiguration() {
      DashboardStateService.goToProjectConfiguration();
      close();
    }

    function logout() {
      LogoutDialogService.showDialog()
        .onConfirm(DashboardStateService.logout);
    }
  }

}());