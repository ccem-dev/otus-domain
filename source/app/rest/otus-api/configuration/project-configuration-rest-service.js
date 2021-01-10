(function () {
  'use strict';

  angular
    .module('otusDomain.rest')
    .service('otusDomain.rest.configuration.ProjectConfigurationService', ProjectConfigurationService);

  ProjectConfigurationService.$inject = [
    'OtusRestResourceService',
    '$q'
  ];

  function ProjectConfigurationService(OtusRestResourceService, $q) {
    var _configurationResource;
    var _projectConfigurationResource;
    var _permissionConfiguration;
    var _userResource;
    var _reportResource;
    var _surveyResource;
    var self = this;

    /* Public methods */
    self.$onInit = onInit;
    self.getSurveysManagerConfiguration = getSurveysManagerConfiguration;
    self.getSurveyTemplatesByAcronym = getSurveyTemplatesByAcronym;
    self.getSurveyVersions = getSurveyVersions;
    self.publishTemplate = publishTemplate;
    self.updateSurveyTemplateType = updateSurveyTemplateType;
    self.deleteSurveyTemplate = deleteSurveyTemplate;
    self.fetchProjectsVisualIdentity = fetchProjectsVisualIdentity;
    self.updateVisualIdentityConfiguration = updateVisualIdentityConfiguration;
    self.getProjectConfiguration = getProjectConfiguration;
    self.allowNewParticipants = allowNewParticipants;
    self.autoGenerateRecruitmentNumber = autoGenerateRecruitmentNumber;
    self.addressCensusRequired = addressCensusRequired;
    self.getUserResource = getUserResource;
    self.setUsersExclusiveDisjunction = setUsersExclusiveDisjunction;
    self.updateUsersExclusiveDisjunction = updateUsersExclusiveDisjunction;
    self.getCollectionOfPermissions = getCollectionOfPermissions;
    self.fetchUsers = fetchUsers;
    self.getActivityReports = getActivityReports;
    self.updateActivityReport = updateActivityReport;
    self.deleteActivityReport = deleteActivityReport;
    self.publishActivityReport = publishActivityReport;
    self.updateSurveyRequiredExternalID = updateSurveyRequiredExternalID;

    onInit();

    function onInit() {
      _configurationResource = OtusRestResourceService.getConfigurationResource();
      _projectConfigurationResource = OtusRestResourceService.getProjectConfigurationResource();
      _permissionConfiguration = OtusRestResourceService.getPermissionConfigurationResource();
      _userResource = OtusRestResourceService.getUserResource();
      _reportResource = OtusRestResourceService.getReportResourceFactory();
    }

    function fetchUsers() {
      var defer = $q.defer();
      _userResource.list(function (response) {
        if ('data' in response) {
          defer.resolve(response.data);
        } else {
          defer.reject(true);
        }
      });
      return defer.promise;
    }

    /* Surveys Manager Section */
    function getSurveysManagerConfiguration() {
      var defer = $q.defer();
      _configurationResource.getAllSurveys(function (response) {
        if ('data' in response) {
          defer.resolve(response.data);
        } else {
          defer.reject(true);
        }
      });
      return defer.promise;
    }

    function getSurveyTemplatesByAcronym(acronym) {
      var defer = $q.defer();
      _configurationResource.getByAcronym({
          'acronym': acronym
        },
        function (response) {
          if (response.data) {
            defer.resolve(response.data);
          } else {
            defer.reject(response.data);
          }
        });
      return defer.promise;
    }

    function getSurveyVersions(acronym) {
      var defer = $q.defer();
      _configurationResource.getSurveyVersions({
          'acronym': acronym,
        },
        function (response) {
          if (response.data) {
            defer.resolve(response.data);
          } else {
            defer.reject(response.data);
          }
        });
      return defer.promise;
    }

    function updateSurveyTemplateType(updateObject) {
      var defer = $q.defer();
      _configurationResource.updateSurveyTemplateType({
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
      _configurationResource.deleteSurveyTemplate({
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
      _configurationResource.publishTemplate(template,
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
      _configurationResource.getVisualIdentity(function (response) {
        defer.resolve();
      });
      return defer.promise;
    }

    function updateVisualIdentityConfiguration(files) {
      var defer = $q.defer();
      _configurationResource.updateVisualIdentity(files, function () {
        defer.resolve();
      });
      return defer.promise;
    }

    /* participant registration */
    function getProjectConfiguration() {
      var defer = $q.defer();
      if (!_projectConfigurationResource) {
        throw new Error('REST resource is not initialized.');
      }
      _projectConfigurationResource.getProjectConfiguration(function (response) {
        if ('data' in response) {
          defer.resolve(response.data);
        } else {
          defer.reject(true);
        }
      });
      return defer.promise;
    }

    function allowNewParticipants(permission) {
      if (!_projectConfigurationResource) {
        throw new Error('REST resource is not initialized.');
      }
      return _projectConfigurationResource.allowNewParticipants({'permission': permission}).$promise;
    }

    function autoGenerateRecruitmentNumber(permission) {
      if (!_projectConfigurationResource) {
        throw new Error('REST resource is not initialized.');
      }
      return _projectConfigurationResource.autoGenerateRecruitmentNumber({'permission': permission}).$promise;
    }

    function addressCensusRequired(permission) {
      if (!_projectConfigurationResource) {
        throw new Error('REST resource is not initialized.');
      }
      return _projectConfigurationResource.addressCensusRequired({'permission': permission}).$promise;
    }

    function getUserResource() {
      if (!_userResource) {
        throw new Error('REST resource is not initialized.');
      }
      return _userResource;
    }

    /* survey template settings */
    function setUsersExclusiveDisjunction(users) {
      var defer = $q.defer();
      if (!_permissionConfiguration) {
        throw new Error('REST resource is not initialized.');
      }
      _permissionConfiguration.create(users, function () {
        defer.resolve();
      });
      return defer.promise;
    }

    function updateUsersExclusiveDisjunction(users) {
      var defer = $q.defer();
      if (!_permissionConfiguration) {
        throw new Error('REST resource is not initialized.');
      }
      _permissionConfiguration.update(users, function () {
        defer.resolve();
      });
      return defer.promise;
    }

    function getCollectionOfPermissions() {
      var defer = $q.defer();
      if (!_permissionConfiguration) {
        throw new Error('REST resource is not initialized.');
      }
      _permissionConfiguration.getAll(function (response) {
        if ('data' in response) {
          defer.resolve(response.data);
        } else {
          defer.reject(true);
        }
      });
      return defer.promise;
    }

    function getActivityReports(acronym) {
      var defer = $q.defer();
      _reportResource.getActivityReportList({
          'acronym': acronym
        },
        function (response) {
          if (response.data) {
            defer.resolve(response.data);
          } else {
            defer.reject(response.data);
          }
        });
      return defer.promise;
    }

    function updateActivityReport(id, versionCandidates) {
      var defer = $q.defer();
      _reportResource.updateActivityReport({
          'id': id,
          'versions': versionCandidates
        },
        function (response) {
          if (response.data) {
            defer.resolve(response);
          } else {
            defer.reject(response);
          }
        });
      return defer.promise;
    }

    function deleteActivityReport(id) {
      var defer = $q.defer();
      _reportResource.remove({
          'id': id,
        },
        function (response) {
          if (response.data) {
            defer.resolve(response);
          } else {
            defer.reject(reponse);
          }
        });

      return defer.promise;
    }

    function publishActivityReport(report) {
      var defer = $q.defer();
      _reportResource.createActivityReport(report,
        function (response) {
          if ('data' in response) {
            defer.resolve(response.data);
          } else {
            defer.reject(response.MESSAGE);
          }
        });
      return defer.promise;
    }

     function updateSurveyRequiredExternalID(id, requiredExternalID) {
      var defer = $q.defer();
      if (! _configurationResource) {
        throw new Error('REST resource is not initialized.');
      }
       _configurationResource.updateSurveyRequiredExternalID({
          'id': id,
          'requiredExternalID': requiredExternalID
      }, function (response) {
          if (response.data) {
              defer.resolve(response);
          } else {
              defer.reject(response);
          }
      });
      return defer.promise;
    }

  }
}());
