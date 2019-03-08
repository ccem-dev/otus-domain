xdescribe('SurveyGroupConfigurationService', function () {
  var Mock = {};
  var Injections = {};
  var service;
  var originalTimeout;

  beforeEach(function () {
    angular.mock.module('otusDomain.project');
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  describe('serviceInstance', function () {

    beforeEach(function () {
      mockInjections();
      angular.mock.module('otusDomain.rest', function ($provide) {
        $provide.value('SurveyGroupRestService', Mock.SurveyGroupRestService);
        $provide.value('otusjs.survey.GroupManagerFactory', { create: () => { } })
      });
    });

    beforeEach(function () {
      inject(function (_$injector_, _$q_) {
        Injections = {
          $q: _$q_,
          SurveyGroupRestService: _$injector_.get('SurveyGroupRestService'),
          GroupManagerFactory: _$injector_.get('otusjs.survey.GroupManagerFactory')
        };
        service = _$injector_.get('otusDomain.project.activity.SurveyGroupConfigurationService', Injections);
        spyOn(Injections.SurveyGroupRestService, "getListOfSurveyGroups").and.callThrough();
        spyOn(Injections.SurveyGroupRestService, "addNewSurveyGroup").and.callThrough();
        spyOn(Injections.SurveyGroupRestService, "updateSurveyGroupName").and.callThrough();
        spyOn(Injections.SurveyGroupRestService, "updateSurveyGroupAcronyms").and.callThrough();
        spyOn(Injections.SurveyGroupRestService, "deleteSurveyGroup").and.callThrough();
      });
    });

    it('serviceExistence check', function () {
      expect(service).toBeDefined();
    });

  });

  function mockInjections() {
    Mock.response = [
      { '_id': "5c8147d4257ce9006436ee95", "objectType": "SurveyGroup", "name": "GRUPO 1", "surveyAcronyms": [] },
      { '_id': "5c8147d4257ce9006436ee95", "objectType": "SurveyGroup", "name": "GRUPO 2", "surveyAcronyms": ['ABC', 'DEF'] }
    ];

    Mock.SurveyGroupRestService = {
      getListOfSurveyGroups: function () {
        return Promise.resolve({ data: Mock.response });
      },
      addNewSurveyGroup: function (data) {
        return Promise.resolve({ data: data });
      },
      updateSurveyGroupName: function (data) {
        return Promise.resolve({ data: data });
      },
      updateSurveyGroupAcronyms: function (data) {
        return Promise.resolve({ data: data });
      },
      deleteSurveyGroup: function (data) {
        return Promise.resolve({ data: data });
      }
    };
    return Mock.SurveyGroupRestService;
  }

});