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
    'ProjectContext',
    'UserService'
  ];

  function DashboardMenuController(LogoutDialogService, DashboardStateService, $mdSidenav, ProjectSelectionService, ProjectContext, UserService) {
    var self = this;

    /* Public interface */
    self.getSelectedSystemArea = getSelectedSystemArea;
    self.open = open;
    self.close = close;
    self.openHome = openHome;
    self.logout = logout;
    self.openProjectCenters = openProjectCenters;
    self.openUserActivationInProject = openUserActivationInProject;
    self.openProjectConfiguration = openProjectConfiguration;
    self.openProjectActivityConfiguration = openProjectActivityConfiguration;
    self.openReportManager = openReportManager;
    self.openDatasourceManager = openDatasourceManager;
    self.openFollowUpConfiguration = openFollowUpConfiguration;
    self.openLocationPoint = openLocationPoint;
    self.openLaboratoryConfiguration = openLaboratoryConfiguration;

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

    function openLocationPoint() {
      DashboardStateService.goToLocationPoint();
      close();
    }

    function openFollowUpConfiguration() {
      DashboardStateService.goToFollowUpConfiguration();
      close();
    }

    function openLaboratoryConfiguration() {
      DashboardStateService.goToLaboratoryConfiguration();
      close();
    }

    function logout() {
      LogoutDialogService.showDialog()
        .onConfirm(() => {
          UserService.logout();
          DashboardStateService.logout();
        })
    }
  }

}());
