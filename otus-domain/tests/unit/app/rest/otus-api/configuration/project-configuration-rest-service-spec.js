xdescribe('ProjectConfigurationService Test', function () {
  var Mock = {};
  var service;
  var Injections = {};

  beforeEach(function () {
    angular.mock.module('otusDomain.rest');
  });

  describe('serviceInstance', function () {

    beforeEach(function () {
      mockInjections();

      angular.mock.module('otusDomain.rest', function ($provide) {
        $provide.value('OtusRestResourceService', Mock.OtusRestResourceService);
      });
    });

    beforeEach(function () {
      inject(function (_$injector_) {
        Injections = {
          OtusRestResourceService: Mock.OtusRestResourceService,
          $q: _$injector_.get('$q')
        };
        service = _$injector_.get('otusDomain.rest.configuration.ProjectConfigurationService', Injections);
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
      });
    });
  });

  function mockInjections() {
    Mock.OtusRestResourceService = {
      getConfigurationResource: () => {
        return {
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
          }
        };
      },
      getProjectConfigurationResource: () => {
        return {
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
      },
      getPermissionConfigurationResource: () => {
        return {
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
      },
      getUserResource: () => {
        return {
          list: () => {
            return Promise.resolve({});
          }
        };
      }
    };
  }
});