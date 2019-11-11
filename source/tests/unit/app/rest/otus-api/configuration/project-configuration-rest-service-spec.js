describe('ProjectConfigurationService Test', function () {
  var Mock = {};
  var service;
  var Injections = {};
  var UNINITIALIZED_REST_ERROR_MESSAGE = 'REST resource is not initialized.';

    beforeEach(function () {
      mocks();
      angular.mock.module('otusDomain.rest');
      angular.mock.module('otus.client');

      inject(function ($injector) {
        Injections = {
          OtusRestResourceService: $injector.get('OtusRestResourceService'),
          $q: $injector.get('$q')
        };
        service = $injector.get('otusDomain.rest.configuration.ProjectConfigurationService', Injections);
      });
    });

    describe('service basic unit test', function () {
      it('should to be defined', function () {
        expect(service).toBeDefined();
        expect(service.getSurveysManagerConfiguration).toBeDefined();
        expect(service.getSurveyTemplatesByAcronym).toBeDefined();
        expect(service.getSurveyVersions).toBeDefined();
        expect(service.publishTemplate).toBeDefined();
        expect(service.updateSurveyTemplateType).toBeDefined();
        expect(service.deleteSurveyTemplate).toBeDefined();
        expect(service.fetchProjectsVisualIdentity).toBeDefined();
        expect(service.updateVisualIdentityConfiguration).toBeDefined();
        expect(service.getProjectConfiguration).toBeDefined();
        expect(service.allowNewParticipants).toBeDefined();
        expect(service.autoGenerateRecruitmentNumber).toBeDefined();
        expect(service.getUserResource).toBeDefined();
        expect(service.setUsersExclusiveDisjunction).toBeDefined();
        expect(service.updateUsersExclusiveDisjunction).toBeDefined();
        expect(service.getCollectionOfPermissions).toBeDefined();
        expect(service.fetchUsers).toBeDefined();
        expect(service.getActivityReports).toBeDefined();
        expect(service.updateActivityReport ).toBeDefined();
        expect(service.deleteActivityReport ).toBeDefined();
        expect(service.publishActivityReport).toBeDefined();
        expect(service.updateSurveyRequiredExternalID).toBeDefined();
      });
    });

    it('updateSurveyRequiredExternalID_method should add user on update', function (){
      spyOn(Injections.OtusRestResourceService, "getConfigurationResource").and.returnValue(Mock.getConfigurationResource);
      service.$onInit();
      expect(Injections.OtusRestResourceService.getConfigurationResource).toHaveBeenCalledTimes(1);
      expect(JSON.stringify(service.updateSurveyRequiredExternalID({},{}))).toEqual(Mock.resultUpdateSurveyRequiredExternalID);
    });

  function mocks() {
    Mock.resultUpdateSurveyRequiredExternalID = '{"$$state":{"status":0}}';
    Mock.getConfigurationResource = {
      getAllSurveys: () => {
        return Promise.resolve({});
      },
      getByAcronym: () => {
        return Promise.resolve({});
      },
      getSurveyVersions: () => {
        return Promise.resolve({});
      },
      updateSurveyTemplateType: function () {
        return Promise.resolve({});
      },
      deleteSurveyTemplate: function () {
        return Promise.resolve({});
      },
      publishTemplate: function () {
        return Promise.resolve({});
      },
      getVisualIdentity: function () {
        return Promise.resolve({});
      },
      updateVisualIdentity: function () {
        return Promise.resolve({});
      },
      updateSurveyRequiredExternalID: () => {
        return Promise.resolve({});
      }
    };
    Mock.getProjectConfigurationResource = {
      getProjectConfiguration: () => {
        return Promise.resolve({});
      },
      allowNewParticipants: () => {
        return Promise.resolve({});
      },
      autoGenerateRecruitmentNumber: () => {
        return Promise.resolve({});
      }
    };
    Mock.getPermissionConfigurationResource = {
      create: () => {
        return Promise.resolve({});
      },
      update: () => {
        return Promise.resolve({});
      },
      getAll: () => {
        return Promise.resolve({});
      }
    };
    Mock.getUserResource = {
      list: () => {
        return Promise.resolve({});
      }
    };
  }
});