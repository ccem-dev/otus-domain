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
        self.publishTemplate = publishTemplate;
        self.updateSurveyTemplateType = updateSurveyTemplateType;
        self.deleteSurveyTemplate = deleteSurveyTemplate;

        self.fetchProjectsVisualIdentity = fetchProjectsVisualIdentity;
        self.updateVisualIdentityConfiguration = updateVisualIdentityConfiguration;

        function _init() {}


        /* Surveys Manager Section */
        function fetchSurveysManagerConfiguration() {
            var ProjectConfiguration = OtusRestResourceService.getProjectConfigurationResource();
            var defer = $q.defer();
            ProjectConfiguration.getSurveys(function(response) {
                defer.resolve(response.data);
            }, function() {
                console.log('error');
            });
            return defer.promise;
        }

        function updateSurveyTemplateType(updateObject, successfullCallback, failureCallback) {
            var ProjectConfiguration = OtusRestResourceService.getProjectConfigurationResource();
            var defer = $q.defer();
            ProjectConfiguration.updateSurveyTemplateType({
                    'acronym': updateObject.acronym,
                    'newSurveyFormType': updateObject.type
                },
                function(response) {
                  defer.resolve(true);
                    successfullCallback();
                },
                function(error) {
                  defer.reject(true);
                    failureCallback();
                });
        }

        function deleteSurveyTemplate(acronym) {
            var defer = $q.defer();
            var ProjectConfiguration = OtusRestResourceService.getProjectConfigurationResource();
            ProjectConfiguration.deleteSurveyTemplate({
                    'acronym': acronym,
                },
                function(response) {
                    console.log(response);
                    if (true) {
                        defer.resolve(true);
                    } else {
                        defer.reject(true);
                    }
                },
                function(error) {
                    console.log('error');
                });

            return defer.promise;
        }

        function publishTemplate(file) {
            var ProjectConfiguration = OtusRestResourceService.getProjectConfigurationResource();
            var defer = $q.defer();
            ProjectConfiguration.publishTemplate(file,
            // ProjectConfiguration.publishTemplate({'template':file, callback: function() {}},
                function(response) {
                  console.log(response);
                    if ('data' in response) {
                          defer.resolve(true);
                    }
                    else{
                          defer.reject(true);
                    }
                },
                function(error) {
                  console.log('error');
                    // failureCallback();
                });
            return defer.promise;
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
