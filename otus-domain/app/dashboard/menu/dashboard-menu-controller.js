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
        'ProjectContext',
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
        self.chooseProject = chooseProject;
        self.hasSelectedProject = hasSelectedProject;
        self.getCurrentProject = getCurrentProject;
        self.openProjectCenters = openProjectCenters;


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

        function openProjectCenters() {
            DashboardStateService.goToProjectCenters();
            close();
        }

        function logout() {
            LogoutDialogService.showDialog()
                .onConfirm(DashboardStateService.logout);
        }

        function hasSelectedProject(){
            return ProjectContext.hasProject();
        }

        function getCurrentProject(){
            return ProjectContext.getCurrentProject();
        }

        function chooseProject(){
            ProjectSelectionService.choose();
        }
    }

}());
