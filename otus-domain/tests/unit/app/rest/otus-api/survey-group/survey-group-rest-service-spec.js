describe('SurveyGroupRestService', function () {
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
          OtusRestResourceService: Mock.OtusRestResourceService
        };
        service = _$injector_.get('SurveyGroupRestService', Injections);
        service.initialize();
      });
    });

    fdescribe('initialize method', function () {
      beforeEach(function () {
        spyOn(service, 'initialize').and.callThrough();
        spyOn(Injections.OtusRestResourceService, 'getSurveyGroupResource').and.callThrough();
        service.initialize();
      });

      it('should initialize be defined', function () {
        expect(service.initialize).toHaveBeenCalled();
        expect(service.initialize).not.toBeNull();
        expect(Injections.OtusRestResourceService.getSurveyGroupResource).toHaveBeenCalled();
      });
    });
  });

  function mockInjections() {
    Mock.OtusRestResourceService = {
      getDatasourceResourceFactory: () => {
        return {
          getListOfSurveyGroups: () => {
            return Promise.resolve({ data: datasource });
          },
          addNewSurveyGroup: (group) => {
            return Promise.resolve({ data: group });
          },
          updateSurveyGroupName: (data) => {
            return Promise.resolve({ data: Mock.datasourceList });
          },
          updateSurveyGroupAcronyms: function (data) {
            return Promise.resolve({ data: data });
          },
          deleteSurveyGroup: function (data) {
            return Promise.resolve({ data: data });
          }
        };
      }
    };
  }
});