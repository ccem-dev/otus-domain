describe('SurveyGroupConfigurationService', function () {
  var Mock = {};
  var service;

  beforeEach(function () {
    mockInjections();
    angular.mock.module('otusDomain.project', function ($provide) {
      $provide.value('SurveyGroupRestService', Mock.SurveyGroupRestService);
      $provide.value('otusjs.survey.GroupManagerFactory', Mock.GroupManagerFactory);
      $provide.value('$q', Mock.$q);
    });
  });

  beforeEach(function () {
    inject(function (_$injector_) {
      service = _$injector_.get('otusDomain.project.activity.SurveyGroupConfigurationService');
    });

  });

  it('should serviceInstance is defined', function () {
    expect(service.getListOfSurveyGroups).toBeDefined();
    expect(service.addNewSurveyGroup).toBeDefined();
    expect(service.updateSurveyGroupName).toBeDefined();
    expect(service.deleteSurveyGroup).toBeDefined();
    expect(service.updateSurveyGroupAcronyms).toBeDefined();
  });

  describe("methods done", function () {
    beforeEach(function () {
      spyOn(Mock.SurveyGroupRestService, "getListOfSurveyGroups").and.callThrough();
      spyOn(Mock.SurveyGroupRestService, "addNewSurveyGroup").and.callThrough();
      spyOn(Mock.SurveyGroupRestService, "updateSurveyGroupName").and.callThrough();
      spyOn(Mock.SurveyGroupRestService, "updateSurveyGroupAcronyms").and.callThrough();
      spyOn(Mock.SurveyGroupRestService, "deleteSurveyGroup").and.callThrough();
      spyOn(Mock.GroupManagerFactory, "create").and.callThrough();
      spyOn(Mock.managerFactory, "createGroup").and.callThrough();
    });

    it('should getListOfSurveyGroups called', function () {
      service.getListOfSurveyGroups();
      expect(Mock.SurveyGroupRestService.getListOfSurveyGroups).toHaveBeenCalledTimes(1);
      Mock.SurveyGroupRestService.getListOfSurveyGroups().then(function () {
        expect(Mock.GroupManagerFactory.create).toHaveBeenCalledTimes(1);
      });
    });

    it('should addNewSurveyGroup called', function () {
      service.getListOfSurveyGroups();
      Mock.SurveyGroupRestService.getListOfSurveyGroups().then(function () {
        service.addNewSurveyGroup(Mock.newName);
        expect(Mock.SurveyGroupRestService.addNewSurveyGroup).toHaveBeenCalledTimes(1);
        expect(Mock.managerFactory.createGroup).toHaveBeenCalledTimes(1);
      });
    });

    it('should updateSurveyGroupName called', function () {
      service.updateSurveyGroupName(Mock.oldName,Mock.newName);
      expect(Mock.SurveyGroupRestService.updateSurveyGroupName).toHaveBeenCalledTimes(1);
      expect(Mock.SurveyGroupRestService.updateSurveyGroupName).toHaveBeenCalledWith(Mock.updateStrutureUpdate);
    });

    it('should deleteSurveyGroup called', function () {
      service.deleteSurveyGroup(Mock.oldName);
      expect(Mock.SurveyGroupRestService.deleteSurveyGroup).toHaveBeenCalledTimes(1);
      expect(Mock.SurveyGroupRestService.deleteSurveyGroup).toHaveBeenCalledWith(Mock.updateStrutureDelete);

    });

    it('should updateSurveyGroupAcronyms called', function () {
      service.updateSurveyGroupAcronyms(Mock.response[0]);
      expect(Mock.SurveyGroupRestService.updateSurveyGroupAcronyms).toHaveBeenCalledTimes(1);
      expect(Mock.SurveyGroupRestService.updateSurveyGroupAcronyms).toHaveBeenCalledWith(Mock.response[0]);
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
      },
      initialize: function (data) {
        return true;
      }
    };

    Mock.managerFactory = {createGroup: function () {}}

    Mock.GroupManagerFactory = { create: () => { return Mock.managerFactory} };

    Mock.oldName = "NAME_1";
    Mock.newName = "NAME_2";

    Mock.updateStrutureUpdate  = {
      surveyGroupName: Mock.oldName,
      newSurveyGroupName: Mock.newName
    };

    Mock.updateStrutureDelete  = {
      surveyGroupName: Mock.oldName,
      newSurveyGroupName: ''
    };

  }

});
