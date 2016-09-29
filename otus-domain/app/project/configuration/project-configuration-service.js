(function() {
    'use strict';

    angular
        .module('otusDomain.project.configuration')
        .service('otusjs.otus-domain.project.configuration.ProjectConfigurationService', ProjectConfigurationService);

    ProjectConfigurationService.$inject = [
        'OtusRestResourceService',
        '$http',
        '$q'
    ];

    function ProjectConfigurationService(OtusRestResourceService, $http, $q) {
        var self = this;
        _init();

        /* Public Interface */
        self.fetchSurveysManagerConfiguration = fetchSurveysManagerConfiguration;
        self.fetchProjectsVisualIdentity = fetchProjectsVisualIdentity;
        self.updateSurveysManagerConfiguration = updateSurveysManagerConfiguration;
        self.updateVisualIdentityConfiguration = updateVisualIdentityConfiguration;

        function _init() {}


        /* Surveys Manager Section */
        function fetchSurveysManagerConfiguration() {
            var ProjectConfiguration = OtusRestResourceService.getProjectConfigurationResource();
            var defer = $q.defer();
            ProjectConfiguration.getSurveys(function(response) {
                console.log(response);
                defer.resolve(response.data);
            }, function() {
                console.log('error');
            });
            return defer.promise;
        }

        function updateSurveysManagerConfiguration(updateObject, successfullCallback, failureCallback) {
            var ProjectConfiguration = OtusRestResourceService.getProjectConfigurationResource();
            ProjectConfiguration.publishTemplate(updateObject.post,
                function(data) {
                    console.log(data);
                    successfullCallback();
                },
                function(error) {
                    failureCallback();
                });


            //TODO - return goes on then


        }

        /* Visual Identity Section*/
        function fetchProjectsVisualIdentity() {
            var ProjectConfiguration = OtusRestResourceService.getProjectConfigurationResource();
            var data = {};
            ProjectConfiguration.getVisualIdentity(function(response) {
                data = response.data;
            }, function(error) {
                console.log('error ' + error);
                data = {};
            });
            return data;
        }

        function updateVisualIdentityConfiguration(files, successfullCallback, failureCallback) {
            var ProjectConfiguration = OtusRestResourceService.getProjectConfigurationResource();
            var success;
            ProjectConfiguration.updateVisualIdentity(files, function() {
                successfullCallback();
            }, function() {
                failureCallback();
            });
        }
    }
}());
