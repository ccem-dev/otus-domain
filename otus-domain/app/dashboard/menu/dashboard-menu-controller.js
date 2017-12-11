(function() {
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
        self.openSurveyForms = openSurveyForms;
        self.openUserActivation = openUserActivation;
        self.logout = logout;
        self.openProjectCenters = openProjectCenters;
        self.openUserActivationInProject = openUserActivationInProject;
        self.openProjectConfiguration = openProjectConfiguration;
        self.openProjectActivityConfiguration =openProjectActivityConfiguration;

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

        function openSurveyForms() {
            DashboardStateService.goToSurveyForms();
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
