(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .controller('ProjectChooseController', ProjectChooseController);

    ProjectChooseController.$inject = ['$scope', '$mdDialog', 'context', 'ProjectSecurityService', '$mdToast'];

    function ProjectChooseController($scope, $mdDialog, context, ProjectSecurityService, $mdToast) {
        var OFFLINE_MESSAGE = 'Projeto Offline. Verifique o estado do projeto.';
        $scope.close = close;
        $scope.context = context;
        $scope.select = select;

        init();

        function init() {
            validateConnection($scope.context.projects);
        }

        function validateConnection(projects) {
            projects.forEach(function(project, index, array) {
                ProjectSecurityService.isOnline(project);
            });
        }

        function close() {
            $mdDialog.cancel();
        }

        function select(project) {
            if (project.status) {
                $scope.context.selected(project);
                close();
            } else {
                $mdToast.show($mdToast.simple().textContent(OFFLINE_MESSAGE));
            }
        }
    }

})();
