(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .directive('otusWaitingProject', otusWaitingProject);

    otusWaitingProject.$inject = ['ProjectContext'];

    function otusWaitingProject(ProjectContext) {
        var ddo = {
            retrict: 'A',
            controller: function(ProjectContext, $scope, $element) {
                if (ProjectContext.hasProject()) {
                    $element.show();
                } else {
                    $element.hide();
                }

                registerObserver($element);
            }
        };

        function registerObserver($element) {
            ProjectContext.registerObserver(function(project) {
                if (project) {
                    $element.show();
                } else {
                    $element.hide();
                }
            });
        }

        return ddo;
    }

}());
