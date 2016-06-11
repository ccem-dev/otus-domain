(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .controller('ProjectChooseController', ProjectChooseController);

    ProjectChooseController.$inject = ['$scope', '$mdDialog', 'context', 'ProjectSecurityService'];

    function ProjectChooseController($scope, $mdDialog, context, ProjectSecurityService) {
        $scope.close = close;
        $scope.context = context;
        $scope.select = select;

        init();

        function init(){
            validateConnection($scope.context.projects);
        }

        function validateConnection(projects){
            projects.forEach(function(project, index, array){
                ProjectSecurityService.isOnline(project);
            });
        }

        function close(){
            $mdDialog.cancel();
        }

        function select(project){
            $scope.context.selected(project);
            close();
        }
    }

})();
