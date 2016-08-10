(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .controller('ProjectChooseController', ProjectChooseController);

    ProjectChooseController.$inject = ['$scope', '$mdDialog', 'projects', 'ProjectSecurityService', '$mdToast'];

    function ProjectChooseController($scope, $mdDialog, projects, ProjectSecurityService, $mdToast) {
        var OFFLINE_MESSAGE = 'Projeto Offline. Verifique o estado do projeto.';
        var AUTHENTICATION_ERROR_MESSAGE = 'Erro ao realizar autenticação no projeto';

        var self = this;
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
            projects.forEach(function(project) {
                ProjectSecurityService.isOnline(project);
            });
        }

        function select(project) {
            if (project.status) {
                ProjectSecurityService.authenticate(project).then(function(){
                    close();
                }, function(){
                    showAuthenticationErrorMessage();
                });
            } else {
                showOfflineMessage();
            }
        }

        function showOfflineMessage() {
            $mdToast.show($mdToast.simple().textContent(OFFLINE_MESSAGE));
        }
        function showAuthenticationErrorMessage() {
            $mdToast.show($mdToast.simple().textContent(AUTHENTICATION_ERROR_MESSAGE));
        }
    }
})();
