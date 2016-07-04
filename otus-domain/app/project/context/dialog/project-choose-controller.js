(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .controller('ProjectChooseController', ProjectChooseController);

    ProjectChooseController.$inject = ['$scope', '$mdDialog', 'projects', 'ProjectSecurityService', '$mdToast'];

    function ProjectChooseController($scope, $mdDialog, projects, ProjectSecurityService, $mdToast) {
        var OFFLINE_MESSAGE = 'Projeto Offline. Verifique o estado do projeto.';

        self = this;
        self.projects = projects;
        self.close = close;
        self.select = select;

        init();

        function init() {
            validateConnection(self.projects);
        }

        function close() {
            $mdDialog.cancel();
        }

        function validateConnection(projects) {
            projects.forEach(function(project, index, array) {
                ProjectSecurityService.isOnline(project);
            });
        }

        function select(project) {
            if (project.status) {
                ProjectSecurityService.authenticate(project, function() {
                    close();
                });
            } else {
                showOfflineMessage();
            }
        }

        function showOfflineMessage() {
            $mdToast.show($mdToast.simple().textContent(OFFLINE_MESSAGE));
        }
    }
})();
