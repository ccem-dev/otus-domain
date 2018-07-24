(function () {
    'use strict';

    angular
        .module('otusDomain.project.configuration')
        .service('otusjs.otus-domain.project.configuration.ProjectConfigurationService', ProjectConfigurationService);

    ProjectConfigurationService.$inject = [
        'OtusRestResourceService',
        '$q'
    ];

    function ProjectConfigurationService(OtusRestResourceService, $q) {
        var self = this;
        var configurationResource;
        var projectConfiguration;

        /* Public methods */
        self.$onInit = onInit;
        self.fetchSurveysManagerConfiguration = fetchSurveysManagerConfiguration;
        self.publishTemplate = publishTemplate;
        self.updateSurveyTemplateType = updateSurveyTemplateType;
        self.deleteSurveyTemplate = deleteSurveyTemplate;
        self.fetchProjectsVisualIdentity = fetchProjectsVisualIdentity;
        self.updateVisualIdentityConfiguration = updateVisualIdentityConfiguration;
        self.getProjectConfiguration = getProjectConfiguration;
        self.allowNewParticipants = allowNewParticipants;

        onInit();

        function onInit() {
            configurationResource = OtusRestResourceService.getConfigurationResource();
            projectConfiguration = OtusRestResourceService.getProjectConfigurationResource();
        }

        /* Surveys Manager Section */
        function fetchSurveysManagerConfiguration() {
            var defer = $q.defer();
            configurationResource.getSurveys(function (response) {
                if ('data' in response) {
                    defer.resolve(response.data);
                } else {
                    defer.reject(true);
                }
            });
            return defer.promise;
        }

        function updateSurveyTemplateType(updateObject) {
            var defer = $q.defer();
            configurationResource.updateSurveyTemplateType({
                'acronym': updateObject.acronym,
                'newSurveyFormType': updateObject.type
            },
                function (response) {
                    if (response.data) {
                        defer.resolve(true);
                    } else {
                        defer.reject(true);
                    }
                });
            return defer.promise;
        }

        function deleteSurveyTemplate(acronym) {
            var defer = $q.defer();
            configurationResource.deleteSurveyTemplate({
                'acronym': acronym,
            },
                function (response) {
                    if (response.data) {
                        defer.resolve(true);
                    } else {
                        defer.reject(true);
                    }
                });

            return defer.promise;
        }

        function publishTemplate(template) {
            var defer = $q.defer();
            configurationResource.publishTemplate(template,
                function (response) {
                    if ('data' in response) {
                        defer.resolve(response.data);
                    } else {
                        defer.reject(response.MESSAGE);
                    }
                });
            return defer.promise;
        }

        /* Visual Identity Section*/
        function fetchProjectsVisualIdentity() {
            var data = {};
            var defer = $q.defer();
            configurationResource.getVisualIdentity(function (response) {
                defer.resolve();
            });
            return defer.promise;
        }

        function updateVisualIdentityConfiguration(files) {
            var defer = $q.defer();
            configurationResource.updateVisualIdentity(files, function () {
                defer.resolve();
            });
            return defer.promise;
        }

        /* participant registration */
        function getProjectConfiguration() {
            var defer = $q.defer();
            if (!projectConfiguration) {
                throw new Error('REST resource is not initialized.');
            }
            projectConfiguration.getProjectConfiguration(function (response) {
                if ('data' in response) {
                    defer.resolve(response.data);
                } else {
                    defer.reject(true);
                }
            });
            return defer.promise;
        }

        function allowNewParticipants(permission) {
            if (!projectConfiguration) {
                throw new Error('REST resource is not initialized.');
            }
            return projectConfiguration.allowNewParticipants({ 'permission': permission }).$promise;
        }
    }
}());
