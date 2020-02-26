(function() {
    'use strict';

    angular
        .module('otusDomain.project.location')
        .service('LocationPointService', ProjectFieldCenterService);

    ProjectFieldCenterService.$inject = ['LocationPointRestService'];

    function ProjectFieldCenterService(LocationPointRestService) {
        var self = this;

        self.saveLocationPoint = saveLocationPoint;
        self.removeLocation = removeLocation;
        self.saveUserLocation = saveUserLocation;
        self.removeUserLocation = removeUserLocation;
        self.getAll = getAll;
        self.updateLocationPoint = updateLocationPoint;


        function saveLocationPoint(locationPoint) {
            return LocationPointRestService.saveLocationPoint(locationPoint);
        }

        function updateLocationPoint(locationPoint) {
            return LocationPointRestService.updateLocationPoint(locationPoint);
        }

        function removeLocation(locationPoint) {
            return LocationPointRestService.deleteLocationPoint(locationPoint._id.$oid);
        }

        function saveUserLocation(locationPoint, user) {
            return LocationPointRestService.saveUserLocation(locationPoint._id.$oid, user);
        }

        function removeUserLocation(locationPoint, user) {
            return LocationPointRestService.removeUserLocation(locationPoint._id.$oid, user);
        }

        function getAll() {
            return LocationPointRestService.getConfiguration();
        }



    }

}());
