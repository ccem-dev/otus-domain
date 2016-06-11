    (function() {
        'use strict';

        angular
            .module('otusDomain.project')
            .service('ProjectContext', ProjectContext);

        function ProjectContext() {
            var self = this;

            var current = null;
            self.setProject = setProject;
            self.hasProject = hasProject;
            self.getCurrentProject = getCurrentProject;

            function setProject(project){
                current = project;
            }

            function getCurrentProject(){
                return current;
            }

            function hasProject(){
                return (current !== null);
            }
        }

    }());
