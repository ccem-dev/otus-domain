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

    describe('initialize method', function () {
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

    describe('getListOfSurveyGroups method', function () {
      beforeEach(function () {
        spyOn(service, 'getListOfSurveyGroups').and.callThrough();
        service.getListOfSurveyGroups();
      });

      it('should getListOfSurveyGroups method be defined', function () {
        expect(service.getListOfSurveyGroups).toHaveBeenCalled();
        expect(service.getListOfSurveyGroups).not.toBeNull();
      });
    });

    describe('addNewSurveyGroup method', function () {
      beforeEach(function () {
        spyOn(service, 'addNewSurveyGroup').and.callThrough();
        service.addNewSurveyGroup();
      });

      it('should addNewSurveyGroup method be defined', function () {
        expect(service.addNewSurveyGroup).toHaveBeenCalled();
        expect(service.addNewSurveyGroup).not.toBeNull();
      });
    });

    describe('updateSurveyGroupName method', function () {
      beforeEach(function () {
        spyOn(service, 'updateSurveyGroupName').and.callThrough();
        service.updateSurveyGroupName();
      });

      it('should updateSurveyGroupName method be defined', function () {
        expect(service.updateSurveyGroupName).toHaveBeenCalled();
        expect(service.updateSurveyGroupName).not.toBeNull();
      });
    });

    describe('updateSurveyGroupAcronyms method', function () {
      beforeEach(function () {
        spyOn(service, 'updateSurveyGroupAcronyms').and.callThrough();
        service.updateSurveyGroupAcronyms();
      });

      it('should updateSurveyGroupAcronyms method be defined', function () {
        expect(service.updateSurveyGroupAcronyms).toHaveBeenCalled();
        expect(service.updateSurveyGroupAcronyms).not.toBeNull();
      });
    });

    describe('deleteSurveyGroup method', function () {
      beforeEach(function () {
        spyOn(service, 'deleteSurveyGroup').and.callThrough();
        service.deleteSurveyGroup();
      });

      it('should deleteSurveyGroup method be defined', function () {
        expect(service.deleteSurveyGroup).toHaveBeenCalled();
        expect(service.deleteSurveyGroup).not.toBeNull();
      });
    });
  });

  function mockInjections() {
    Mock.response = [
      { '_id': "5c8147d4257ce9006436ee95", "objectType": "SurveyGroup", "name": "GRUPO 1", "surveyAcronyms": [] },
      { '_id': "5c8147d4257ce9006436ee95", "objectType": "SurveyGroup", "name": "GRUPO 2", "surveyAcronyms": ['ABC', 'DEF'] }
    ];

    Mock.OtusRestResourceService = {
      getSurveyGroupResource: () => {
        return {
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
      }
    };
  }
});