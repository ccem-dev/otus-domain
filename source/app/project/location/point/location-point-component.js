(function () {
    'use strict';

    angular
        .module('otusDomain.project.location')
        .component('locationPoint', {
            controller: 'locationPointCtrl as $ctrl',
            templateUrl: 'app/project/location/point/location-point-template.html'
        });

}());
