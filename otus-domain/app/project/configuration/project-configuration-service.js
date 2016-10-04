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
            ProjectConfiguration.updateSurveyTemplateType({
                    'acronym': updateObject.acronym,
                    'newSurveyFormType': updateObject.type,
                    'resourceErrorHandler': failureCallback
                },
                function(response) {
                    successfullCallback();
                },
                function(error) {
                    failureCallback();
                });
        }

        function deleteSurveyTemplate() {
            var defer = $q.defer();
            // defer.resolve(true);
            defer.reject(true);
            return defer.promise;
        }

        function publishTemplate(file, successfullCallback, failureCallback) {
            var ProjectConfiguration = OtusRestResourceService.getProjectConfigurationResource();
            var defer = $q.defer();
            // defer.reject(true);
            ProjectConfiguration.publishTemplate(file,
                function(response) {
                    var errorList = [];
                    console.log(response.data.responses);
                    response.data.responses.forEach(function(validation) {
                        if (validation.conflicts.length !== 0) {
                            errorList.push(validation.VALIDATION_TYPE);
                        }
                    });
                    if (errorList.length > 0) {
                        failureCallback(errorList);
                    } else {
                      defer.resolve(true);
                        successfullCallback();
                    }
                },
                function(error) {
                    failureCallback();
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
