(function() {
    'use strict';

    angular
        .module('otusDomain.project.fieldCenter')
        .service('ProjectFieldCenterService', ProjectFieldCenterService);

    ProjectFieldCenterService.$inject = ['OtusRestResourceService', 'ProjectFieldCenterContext'];

    function ProjectFieldCenterService(OtusRestResourceService, ProjectFieldCenterContext) {
        var self = this;
        self.loadCenters = loadCenters;
        self.getCenters = getCenters;
        self.create = create;
        self.update = update;

        function getCenters() {
            return ProjectFieldCenterContext.fieldCenters;
        }

        function loadCenters() {
            var otusFieldCenter = OtusRestResourceService.getOtusFieldCenterResource();
            otusFieldCenter.getAll(function(response) {
                ProjectFieldCenterContext.setFieldCenters(response.data);
            }, function(){
                ProjectFieldCenterContext.setFieldCenters([]);
            });
        }

        function create(fieldCenter, callback) {
            var otusFieldCenter = OtusRestResourceService.getOtusFieldCenterResource();
            otusFieldCenter.create(fieldCenter, function(response) {
                response.data = {};
                response.data.isValid = false;
                response.data.value = [];
                response.data.value.push("acronym");
                response.data.value.push("code");
                if(response.data.isValid)
                {
                  loadCenters();
                }
                callback(response);
            }, function (response) {

            });
        }

        function update(fieldCenter, callback){
            delete fieldCenter.editMode;

            var otusFieldCenter = OtusRestResourceService.getOtusFieldCenterResource();
            otusFieldCenter.update(fieldCenter, function(response) {
                loadCenters();
                callback(response);
            });
        }

    }

}());
