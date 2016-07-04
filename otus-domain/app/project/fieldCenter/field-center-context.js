(function() {
    'use strict';

    angular
        .module('otusDomain.project.fieldCenter')
        .service('ProjectFieldCenterContext', ProjectFieldCenterContext);

    function ProjectFieldCenterContext() {
        var self = this;
        self.fieldCenters = [];
        self.setFieldCenters = setFieldCenters;

        function setFieldCenters(fieldCenters){
            self.fieldCenters = fieldCenters;
        }
    }

}());
