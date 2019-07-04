describe('Survey Template Configuration Component Test', function () {
  var Mock = {};
  var controller;

  mockValues();
  mockInjections();
  beforeEach(function () {
    angular.mock.module("otusDomain.dashboard", function ($provide) {
      $provide.value('otusDomain.rest.configuration.ProjectConfigurationService', Mock.ProjectConfigurationService);
      $provide.value('otusDomain.project.activity.SurveyGroupConfigurationService', Mock.SurveyGroupConfigurationService);
      $provide.value('$mdDialog', Mock.mdDialog);
      $provide.value('$mdToast', Mock.mdToast);
      $provide.value('otusjs.model.activity.ActivityPermissionFactory', Mock.ActivityPermissionFactory);
      $provide.value('DashboardStateService', Mock.DashboardStateService);
      $provide.value('ActivityConfigurationManagerService', Mock.ActivityConfigurationManagerService);
    });

    inject(function (_$controller_) {
      controller = _$controller_("surveyTemplateConfigurationCtrl", {}, { surveyForm: Mock.surveyList[0], surveyTemplates: Mock.surveyList, mirrorEditModeStatus: function () { } });
    });


    spyOn(Mock.ProjectConfigurationService, "getCollectionOfPermissions").and.callThrough();
    spyOn(Mock.ActivityConfigurationManagerService, "setSurveyInContext").and.callThrough();
    spyOn(Mock.ActivityConfigurationManagerService, "setPermissionInContext").and.callThrough();
    spyOn(Mock.DashboardStateService, "goToActivitySettings").and.callThrough();

  });

  it('should activate group edit mode', function (done) {
    spyOn(Mock.SurveyGroupConfigurationService, "updateSurveyGroupAcronyms").and.callThrough();
    controller.$onInit();
    controller.blocEdit = false;
    expect(controller.surveyGroupsEditMode).toBe(false);
    controller.surveyGroupsEdit();
    expect(controller.surveyGroupsEditMode).toBe(true);
    done()
  });

  it('should not activate group edit mode', function (done) {
    spyOn(Mock.SurveyGroupConfigurationService, "updateSurveyGroupAcronyms").and.callThrough();
    controller.$onInit();
    controller.blocEdit = true;
    expect(controller.surveyGroupsEditMode).toBe(false);
    controller.surveyGroupsEdit();
    expect(controller.surveyGroupsEditMode).toBe(false);
    done()
  });

  it('should remove survey group', function (done) {
    spyOn(Mock.SurveyGroupConfigurationService, "updateSurveyGroupAcronyms").and.callThrough();
    spyOn(Mock.SurveyGroupConfigurationService, 'getListOfSurveyGroups').and.returnValue(Promise.resolve(Mock.groupsManager));
    controller.$onInit();
    controller.blocEdit = true;
    controller.updateSurveyGroups();
    Mock.SurveyGroupConfigurationService.getListOfSurveyGroups().then(function (data) {
      expect(Mock.SurveyGroupConfigurationService.updateSurveyGroupAcronyms).toHaveBeenCalledTimes(1);
    });
    done()
  });

  it('should add survey group', function (done) {
    spyOn(Mock.SurveyGroupConfigurationService, "updateSurveyGroupAcronyms").and.returnValue(Promise.resolve());
    spyOn(Mock.SurveyGroupConfigurationService, 'getListOfSurveyGroups').and.returnValue(Promise.resolve(Mock.groupsManager2));
    controller.$onInit();
    setTimeout(function () {
      controller.surveyForm.groups = [{
        addSurvey: function () { },
        removeSurvey: function () { },
        toJSON: function () { },
        getName: function () {
          return "teste"
        }
      }, {
        addSurvey: function () { },
        removeSurvey: function () { },
        toJSON: function () { },
        getName: function () {
          return "teste1"
        }
      }, {
        addSurvey: function () { },
        removeSurvey: function () { },
        toJSON: function () { },
        getName: function () {
          return "teste2"
        }
      }];
      controller.blocEdit = true;
      controller.updateSurveyGroups();
      Mock.SurveyGroupConfigurationService.getListOfSurveyGroups().then(function (data) {
        expect(Mock.SurveyGroupConfigurationService.updateSurveyGroupAcronyms).toHaveBeenCalledTimes(1);
      });
      done()
    }, 100);
  });

  it('should do nothing on groups update', function (done) {
    spyOn(Mock.SurveyGroupConfigurationService, "updateSurveyGroupAcronyms").and.callThrough();
    spyOn(Mock.SurveyGroupConfigurationService, 'getListOfSurveyGroups').and.returnValue(Promise.resolve(Mock.groupsManager2));
    controller.$onInit();
    setTimeout(function () {
      controller.blocEdit = true;
      controller.updateSurveyGroups();
      Mock.SurveyGroupConfigurationService.getListOfSurveyGroups().then(function (data) {
        expect(Mock.SurveyGroupConfigurationService.updateSurveyGroupAcronyms).toHaveBeenCalledTimes(0);
      });
      done()
    }, 100);
  });

  it('should find a permission relative to survey', function (done) {

    controller.$onInit();
    expect(controller.permission._id).toBeNull();
    controller.permissionList = Mock.Pemissions;
    Mock.ProjectConfigurationService.getCollectionOfPermissions().then(function () {
      done()
    });
    spyOn(Mock.ActivityPermissionFactory, "fromJsonObject").and.returnValue(Mock.Pemissions[1]);
    controller.showActivitySettings();
    expect(Mock.ActivityConfigurationManagerService.setPermissionInContext).toHaveBeenCalledTimes(1);
    expect(Mock.ActivityConfigurationManagerService.setPermissionInContext).toHaveBeenCalledWith(Mock.Pemissions[1]);
    expect(Mock.DashboardStateService.goToActivitySettings).toHaveBeenCalledTimes(1);
    expect(Mock.ActivityPermissionFactory.fromJsonObject).toHaveBeenCalledTimes(1);
    expect(controller.permission._id).not.toBeNull();
    expect(controller.permission.exclusiveDisjunction).toEqual(Mock.Pemissions[1].exclusiveDisjunction);

  });

  it('should delete a survey template', function (done) {
    spyOn(Mock.ProjectConfigurationService, "deleteSurveyTemplate").and.callThrough();
    controller.$onInit();
    expect(controller.surveyTemplates.length).toEqual(3)
    controller.deleteSurveyTemplate();
    Mock.ProjectConfigurationService.deleteSurveyTemplate().then(function () {
      setTimeout(function () {
        expect(controller.surveyTemplates.length).toEqual(2);
        done();
      }, 100)
    })
  });

  it('should not delete a survey template', function (done) {
    spyOn(Mock.ProjectConfigurationService, "deleteSurveyTemplate").and.returnValue(Promise.reject());
    controller.$onInit();
    expect(controller.surveyTemplates.length).toEqual(2)
    controller.deleteSurveyTemplate();
    Mock.ProjectConfigurationService.deleteSurveyTemplate().then(function () {
      done();
    }).catch(function () {
      setTimeout(function () {
        expect(controller.surveyTemplates.length).toEqual(2);
        done();
      }, 100)
    })
  });


  function mockInjections() {
    Mock.SurveyGroupConfigurationService = {
      getListOfSurveyGroups: function () {
        return Promise.resolve()
      },
      updateSurveyGroupAcronyms: function () { }
    };

    Mock.groupsManager = {
      getSurveyGroups: function () {
        return ["teste", "teste1"]
      },
      getGroup: function () {
        return {
          addSurvey: function () { },
          removeSurvey: function () { },
          toJSON: function () { },
          getName: function () {
            return "teste"
          }
        }
      }
    };

    Mock.groupsManager2 = {
      getSurveyGroups: function () {
        return ["teste", "teste1"]
      },
      getGroup: function (groupName) {
        if (groupName == "teste") {
          return {
            addSurvey: function () { },
            removeSurvey: function () { },
            toJSON: function () { },
            getName: function () {
              return "teste"
            }
          }
        } else if (groupName == "teste1") {
          return {
            addSurvey: function () { },
            removeSurvey: function () { },
            toJSON: function () { },
            getName: function () {
              return "teste1"
            }
          }
        } else if (groupName == "teste2") {
          return {
            addSurvey: function () { },
            removeSurvey: function () { },
            toJSON: function () { },
            getName: function () {
              return "teste2"
            }
          }
        }
      }
    };

    Mock.ActivityPermissionFactory = {
      create: function () { },
      fromJsonObject: function (obj) {
        return {
          _id: null,
          objectType: "ActivityPermission",
          acronym: obj.acronym,
          version: obj.version,
          exclusiveDisjunction: [],
        }
      }
    }

    Mock.DashboardStateService = {
      goToActivitySettings: function () { }
    };

    Mock.ActivityConfigurationManagerService = {
      setSurveyInContext: function () { },
      getSurveyOfContext: function () { },
      getPermissionOfContext: function () { },
      setPermissionInContext: function () { }
    }


    Mock.ProjectConfigurationService = {
      fetchSurveysManagerConfiguration: function () {
        return Promise.resolve();
      },
      deleteSurveyTemplate: function () {
        return Promise.resolve();
      },
      updateSurveyTemplateType: function () {
        return Promise.resolve();
      },
      publishTemplate: function () {
        return Promise.resolve(Mock.surveyList[0]);
      },
      getCollectionOfPermissions: function () {
        return Promise.resolve(Mock.Pemissions);
      }
    };

    Mock.mdDialog = {
      show: function () {
        return Promise.resolve();
      },
      confirm: function () {
        var self = this;
        self.title = function () {
          return self;
        };
        self.textContent = function () {
          return self;
        };
        self.ariaLabel = function () {
          return self;
        };
        self.ok = function () {
          return self;
        };
        self.cancel = function () {
          return self;
        };
        return self;
      }
    };

    Mock.mdToast = {
      show: function () { },
      simple: function () {
        var self = this;
        self.title = function () {
          return self;
        };
        self.textContent = function () {
          return self;
        };
        self.hideDelay = function () {
          return self;
        };
        return self;
      }
    }
  }

  function mockValues() {
    Mock.Pemissions = [
      {
        "_id": "5bb3d272cc5fe80077b11615",
        "objectType": "ActivityAccessPermission",
        "version": 2,
        "acronym": "OTUS",
        "exclusiveDisjunction": [
          "pedro.silva@gmail.com"
        ]
      },
      {
        "_id": "5bb3d8ebcc5fe80077b11616",
        "objectType": "ActivityAccessPermission",
        "version": 2,
        "acronym": "CSJ",
        "exclusiveDisjunction": [
          "pedro.silva@gmail.com"
        ]
      }
    ];

    Mock.surveyList = [{
      'sender': "brenoscheffer@gmail.com",
      'sendingDate': "Oct 6, 2016 10:56:46 PM",
      'surveyFormType': "FORM_INTERVIEW",
      'version': 2,
      'isDiscarded': false,
      'surveyTemplate': {
        'identity': {
          'name': 'COLETA JEJUM',
          'acronym': 'CSJ',
        }
      }
    }, {
      'sender': "brenoscheffer@gmail.com",
      'sendingDate': "Oct 6, 2016 10:56:46 PM",
      'surveyFormType': "PROFILE",
      'version': 1,
      'isDiscarded': false,
      'surveyTemplate': {
        'identity': {
          'name': 'Elegibilidade',
          'acronym': 'ELEA'
        }
      }
    }, {
      'sender': "brenoscheffer@gmail.com",
      'sendingDate': "Oct 6, 2016 10:56:46 PM",
      'surveyFormType': "FORM_INTERVIEW",
      'version': 1,
      'isDiscarded': false,
      'surveyTemplate': {
        'identity': {
          'name': 'INT',
          'acronym': 'Integração'
        }
      }
    }];


  }

});